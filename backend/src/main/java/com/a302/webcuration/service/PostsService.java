package com.a302.webcuration.service;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountRepository;
import com.a302.webcuration.domain.Pin.Pin;
import com.a302.webcuration.domain.Pin.PinDto;
import com.a302.webcuration.domain.Post.Posts;
import com.a302.webcuration.domain.Post.PostsDto;
import com.a302.webcuration.domain.Post.PostsRepository;
import com.a302.webcuration.domain.Tag.Tag;
import com.a302.webcuration.domain.Tag.TagRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

@Service
@Transactional
@RequiredArgsConstructor
public class PostsService {
    private final PostsRepository postsRepository;
    private final AccountRepository accountRepository;
    private final TagRepository tagRepository;
    private final JwtService jwtService;
    private final ModelMapper modelMapper;
    public static final Logger logger = LoggerFactory.getLogger(PostsService.class);

    public BaseMessage createPosts(PostsDto.CreatePostsRequest createPostsRequest, String token){
        Long myId = jwtService.getAccountId(token);
        Map<String, Object> resultMap = new HashMap<>();

        try {
            //여기서 아마 글 작성자가 존재하지 않으면 오류 발생할 것
            Account postWriter = accountRepository.findAccountByAccountId(myId);
            logger.info("postsssd : " + createPostsRequest.toString());
            //posts에 저장
            Posts posts = createPostsRequest.toEntity();
            posts.writePost(postWriter);
            logger.info("postsss : " + posts.toString());

            //tag 지정
            List<Tag> tags = createPostsRequest.getPostsTags().stream().map(tag ->
                    tagRepository.findTagByTagId(tag.getTagId())
            ).collect(Collectors.toList());
            for (Tag tag : tags) {
                tag.addPostsTags(posts);
            }
            //pin 지정
            List<Pin> pins = new ArrayList<>();
            for (PinDto.Pin pinDto : createPostsRequest.getPostsPins()) {
                Map<String, Object> searchResult=naverSearchApi(pinDto.getPinName());
                pinDto.setPinApiClass((String)searchResult.get("pinApiClass"));
                pinDto.setPinApiLink((String)searchResult.get("pinApiLink"));
                pins.add(pinDto.toEntity());
            }
            for (Pin pin : pins) {
                pin.saveWithCascadePosts(posts);
            }
            Posts createdPosts=postsRepository.save(posts);
            PostsDto.CreatePostsResponse postsResponse = modelMapper.map(createdPosts, PostsDto.CreatePostsResponse.class);
            return new BaseMessage(HttpStatus.CREATED,postsResponse);
        }
        catch (Exception e)
        {
            resultMap.put("errors",e);
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
    }

    public BaseMessage retrievePosts(Long postsid){
        Map<String, Object> resultMap = new HashMap<>();
        Posts posts=postsRepository.findPostsByPostsId(postsid);
        if(posts==null){
            resultMap.put("message","존재하지 않는 게시물입니다.");
            return new BaseMessage( HttpStatus.BAD_REQUEST,resultMap);
        }
        logger.info("posts = " + posts);
        PostsDto.PostsResponse postsResponse = modelMapper.map(posts, PostsDto.PostsResponse.class);
        logger.info("postsResponse = " + postsResponse);

        logger.info("postsResponse = " + postsResponse);
        return new BaseMessage(HttpStatus.OK,postsResponse);

    }

    public BaseMessage retrievePosts(Long postsid,String token){
        Map<String, Object> resultMap = new HashMap<>();
        Account myAccount;
        Long myId = jwtService.getAccountId(token);
        myAccount = accountRepository.findAccountByAccountId(myId);

        Posts posts=postsRepository.findPostsByPostsId(postsid);
        if(posts==null){
            resultMap.put("message","존재하지 않는 게시물입니다.");
            return new BaseMessage( HttpStatus.BAD_REQUEST,resultMap);
        }
        logger.info("posts = " + posts);
        PostsDto.PostsWithLoginResponse postsResponse = modelMapper.map(posts, PostsDto.PostsWithLoginResponse.class);
        logger.info("postsResponse = " + postsResponse);
        //좋아요 수
        postsResponse.setPostsLikeCnt(posts.getLikeAccounts().size());
        //좋아요 상태
        for (Account likeAccount : posts.getLikeAccounts()){
            if(likeAccount==myAccount){
                postsResponse.setLikeState(true);
            }
        }
        logger.info("after postsResponse = " + postsResponse);
        // TODO: 2021-02-13 이 핀에 해당하는 코멘트들 주기

        return new BaseMessage(HttpStatus.OK,postsResponse);
    }

    public BaseMessage deletePosts(Long postsid,String token) {
        Map<String, Object> resultMap = new HashMap<>();
        Long myId = jwtService.getAccountId(token);
        Account postWriter = accountRepository.findAccountByAccountId(myId);
        Posts posts=postsRepository.findPostsByPostsId(postsid);
        if(posts==null){
            resultMap.put("message","존재하지 않는 게시물입니다.");
            return new BaseMessage( HttpStatus.BAD_REQUEST,resultMap);
        }else if(posts.getPostWriter()!=postWriter){
            resultMap.put("message","작성자 이외에는 글을 삭제할 수 없습니다.");
            return new BaseMessage( HttpStatus.BAD_REQUEST,resultMap);
        }
        postsRepository.deleteById(postsid);
        return new BaseMessage(HttpStatus.OK);
    }

    //Naver Search API
    public Map<String, Object> naverSearchApi(String name) {
        Map<String, Object> resultMap = new HashMap<>();
        String clientId = "4X8INmkNVu2MHVUWKEWn"; //애플리케이션 클라이언트 아이디값"
        String clientSecret = "FTdWvkYh2G"; //애플리케이션 클라이언트 시크릿값"

        String text = null;
        try {
            text = URLEncoder.encode(name, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("검색어 인코딩 실패",e);
        }

        String apiURL = "https://openapi.naver.com/v1/search/shop?query=" + text+"&display=1";    // json 결과\

        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("X-Naver-Client-Id", clientId);
        requestHeaders.put("X-Naver-Client-Secret", clientSecret);
        String responseBody = get(apiURL,requestHeaders);
        logger.info("responseBody "+responseBody);

        JSONParser parser=new JSONParser();
        try {
            JSONObject jsonObject  =  (JSONObject)parser.parse(responseBody);
            JSONArray bookInfoArray = (JSONArray) jsonObject.get("items");
            jsonObject=(JSONObject)bookInfoArray.get(0);
            //최저가 링크 추출
            String pinApiLink=(String)jsonObject .get("link");
            //가장 작은 분류부터 존재하는지 여부확인 후 추출
            String pinApiClass="";
            for (int i=4;i>0;i--){
                pinApiClass=(String)jsonObject .get("category"+i);
                if(!pinApiClass.equals("")){
                    break;
                }
            }
            logger.info("pinApiLink "+pinApiLink);
            logger.info("pinApiClass "+pinApiClass);
            resultMap.put("pinApiLink",pinApiLink);
            resultMap.put("pinApiClass",pinApiClass);
            return resultMap;
        } catch (ParseException e) {
            resultMap.put("error",e);
            e.printStackTrace();
            return resultMap;
        }
    }

    private static String get(String apiUrl, Map<String, String> requestHeaders){
        HttpURLConnection con = connect(apiUrl);
        try {
            con.setRequestMethod("GET");
            for(Map.Entry<String, String> header :requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 호출
                return readBody(con.getInputStream());
            } else { // 에러 발생
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }
    private static String readBody(InputStream body){
        InputStreamReader streamReader = new InputStreamReader(body);

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }
            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }

    private static HttpURLConnection connect(String apiUrl){
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection)url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }
}

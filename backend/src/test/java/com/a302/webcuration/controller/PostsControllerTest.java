package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseControllerTest;
import com.a302.webcuration.domain.Pin.PinDto;
import com.a302.webcuration.domain.Post.PostsDto;
import com.a302.webcuration.domain.Tag.Tag;
import com.a302.webcuration.domain.Tag.TagDto;
import com.a302.webcuration.domain.Tag.TagRepository;
import org.junit.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class PostsControllerTest extends BaseControllerTest {
    @Autowired
    TagRepository tagRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Test
    public void Posts_태그포함생성_성공() throws Exception{
        //When
        //Given
        String postsTitle="우석 작업공간,개발자 관련 게시물";
        String postsContents="노트북좋음";
        List<String> postsPhotos=new ArrayList<>();
        postsPhotos.add("https://lh3.googleusercontent.com/proxy/kr-1BRXpuhgwIVpc5pcfcVV-nEsUduJldGbOpvAUwxHeNK--u7fWsYXfb3PccxrDHvj-HyjDFEyVxUmjQ4oXKVMYGjoJS4wqfyS58JN-Vd6e");
        postsPhotos.add("https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg");
        List<TagDto.Tag> postsTags=new ArrayList<>();
        Tag tag1=tagRepository.findByTagTitle("개발자");
        Tag tag2=tagRepository.findByTagTitle("작업공간");
        postsTags.add(modelMapper.map(tag1,TagDto.Tag.class));
        postsTags.add(modelMapper.map(tag2,TagDto.Tag.class));
        //pin
        List<PinDto.Pin> pins=new ArrayList<>();
        PinDto.Pin pin1=PinDto.Pin.builder()
                .pinName("오디세이 노트북")
                .pinLocY(10.1)
                .pinLocX(10.1)
                .pinLink("https://smartstore.naver.com/ntseller/products/5281314437")
                .pinNum(1)
                .build();
        pins.add(pin1);
        PinDto.Pin pin2=PinDto.Pin.builder()
                .pinName("마우스")
                .pinLocY(10.1)
                .pinLocX(10.1)
                .pinLink("https://smartstore.naver.com/ntseller/products/5281314437")
                .pinNum(1)
                .build();
        pins.add(pin2);

        PostsDto.CreatePostsRequest createAccountRequest= PostsDto.CreatePostsRequest.builder()
                .postsTitle(postsTitle)
                .postsContents(postsContents)
                .postsPhotos(postsPhotos)
                .postsTags(postsTags)
                .postsPins(pins)
                .build();
        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTMzOTEyNTQsImFjY291bnRJZCI6MjQsImFjY291bnRFbWFpbCI6ImRudGpyNDc3MkBuYXZlci5jb20ifQ.Ps_Kqoii6Htjuc94kO5nu-ieSwy6D6cJHQQ2M-olpys";

        mockMvc.perform(post("/api/posts")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createAccountRequest)))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    public void Posts_태그포함생성2_성공() throws Exception{
        //When
        //Given
        String postsTitle="재웅쓰 캠핑 관련글";
        String postsContents="재웅쓰 글 내용 ";
        List<String> postsPhotos=new ArrayList<>();
        postsPhotos.add("https://lh3.googleusercontent.com/proxy/kr-1BRXpuhgwIVpc5pcfcVV-nEsUduJldGbOpvAUwxHeNK--u7fWsYXfb3PccxrDHvj-HyjDFEyVxUmjQ4oXKVMYGjoJS4wqfyS58JN-Vd6e");
        postsPhotos.add("https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg");
        List<TagDto.Tag> postsTags=new ArrayList<>();
        Tag tag1=tagRepository.findByTagTitle("캠핑");
        postsTags.add(modelMapper.map(tag1,TagDto.Tag.class));
        //pin
        List<PinDto.Pin> pins=new ArrayList<>();
        PinDto.Pin pin1=PinDto.Pin.builder()
                .pinName("숯")
                .pinLocY(10.1)
                .pinLocX(10.1)
                .pinLink("https://smartstore.naver.com/ntseller/products/5281314437")
                .pinNum(1)
                .build();
        pins.add(pin1);

        PostsDto.CreatePostsRequest createAccountRequest= PostsDto.CreatePostsRequest.builder()
                .postsTitle(postsTitle)
                .postsContents(postsContents)
                .postsPhotos(postsPhotos)
                .postsTags(postsTags)
                .postsPins(pins)
                .build();
        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTMxODkyMzQsImFjY291bnRJZCI6MjQsImFjY291bnRFbWFpbCI6ImRudGpyNDc3MkBuYXRlLmNvbSJ9.QU_FxH4hw6qHQEU2mYmbe4729DXqkmeD0k0lop-_3EY";

        mockMvc.perform(post("/api/posts")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createAccountRequest)))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    public void Posts_태그포함생성_실패_사진없음() throws Exception{
        //When
        //Given
        String postsTitle="게시물 등록 테스트 사진 없음";
        String postsContents="게시물 등록 테스트 내용 사진 없음";
        List<String> postsPhotos=new ArrayList<>();
        postsPhotos.add("https://lh3.googleusercontent.com/proxy/kr-1BRXpuhgwIVpc5pcfcVV-nEsUduJldGbOpvAUwxHeNK--u7fWsYXfb3PccxrDHvj-HyjDFEyVxUmjQ4oXKVMYGjoJS4wqfyS58JN-Vd6e");
        postsPhotos.add("https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg");
        List<TagDto.Tag> postsTags=new ArrayList<>();
        Tag tag1=tagRepository.findByTagTitle("요리사");
        Tag tag2=tagRepository.findByTagTitle("테라스");
        postsTags.add(modelMapper.map(tag1,TagDto.Tag.class));
        postsTags.add(modelMapper.map(tag2,TagDto.Tag.class));
        //pin
        List<PinDto.Pin> pins=new ArrayList<>();
        PinDto.Pin pin1=PinDto.Pin.builder()
                .pinLocY(10.1)
                .pinLocX(10.1)
                .pinLink("https://smartstore.naver.com/ntseller/products/5281314437")
                .pinNum(1)
                .build();
        pins.add(pin1);

        PostsDto.CreatePostsRequest createAccountRequest= PostsDto.CreatePostsRequest.builder()
                .postsTitle(postsTitle)
                .postsContents(postsContents)
                //.postsPhotos(postsPhotos)
                .postsTags(postsTags)
                .postsPins(pins)
                .build();
        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTMzOTEyNTQsImFjY291bnRJZCI6MjQsImFjY291bnRFbWFpbCI6ImRudGpyNDc3MkBuYXZlci5jb20ifQ.Ps_Kqoii6Htjuc94kO5nu-ieSwy6D6cJHQQ2M-olpys";

        mockMvc.perform(post("/api/posts")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createAccountRequest)))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }
    @Test
    public void Posts_태그포함생성_실패_태그없음() throws Exception{
        //When
        //Given
        String postsTitle="게시물 등록 테스트 태그 없음";
        String postsContents="게시물 등록 테스트 내용 태그 없음";
        List<String> postsPhotos=new ArrayList<>();
        postsPhotos.add("https://lh3.googleusercontent.com/proxy/kr-1BRXpuhgwIVpc5pcfcVV-nEsUduJldGbOpvAUwxHeNK--u7fWsYXfb3PccxrDHvj-HyjDFEyVxUmjQ4oXKVMYGjoJS4wqfyS58JN-Vd6e");
        postsPhotos.add("https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg");
        List<TagDto.Tag> postsTags=new ArrayList<>();
        Tag tag1=tagRepository.findByTagTitle("요리사");
        Tag tag2=tagRepository.findByTagTitle("테라스");
        postsTags.add(modelMapper.map(tag1,TagDto.Tag.class));
        postsTags.add(modelMapper.map(tag2,TagDto.Tag.class));
        //pin
        List<PinDto.Pin> pins=new ArrayList<>();
        PinDto.Pin pin1=PinDto.Pin.builder()
                .pinLocY(10.1)
                .pinLocX(10.1)
                .pinLink("https://smartstore.naver.com/ntseller/products/5281314437")
                .pinNum(1)
                .build();
        pins.add(pin1);

        PostsDto.CreatePostsRequest createAccountRequest= PostsDto.CreatePostsRequest.builder()
                .postsTitle(postsTitle)
                .postsContents(postsContents)
                .postsPhotos(postsPhotos)
                //.postsTags(postsTags)
                .postsPins(pins)
                .build();
        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTI3ODcwNjIsImFjY291bnRJZCI6MSwiYWNjb3VudEVtYWlsIjoiZG50anI0NzcyQG5hdmVyLmNvbSJ9.tiZPXCzeB0uHo6BQmXwxDJdsEwXFe-HFImn5lMA5JTs";

        mockMvc.perform(post("/api/posts")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createAccountRequest)))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    public void Posts_조회_성공() throws Exception{
        Long id=25L;
        mockMvc.perform(get("/api/posts/"+Long.toString(id))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void Posts_조회_실패() throws Exception{
        Long id=24L;
        mockMvc.perform(get("/api/posts/"+Long.toString(id))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }
}
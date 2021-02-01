package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseControllerTest;
import com.a302.webcuration.domain.Account.Account;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class PostsControllerTest extends BaseControllerTest {
    @Autowired
    TagRepository tagRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Test
    public void Posts_생성_성공() throws Exception{
        //When
        //Given
        String postsTitle="내 작업공간 어때??!!!!";
        String postsContents="이런거 있어";
        String postsLocation="수원시 팔달구";
        List<String> postsPhotos=new ArrayList<>();
        postsPhotos.add("https://lh3.googleusercontent.com/proxy/kr-1BRXpuhgwIVpc5pcfcVV-nEsUduJldGbOpvAUwxHeNK--u7fWsYXfb3PccxrDHvj-HyjDFEyVxUmjQ4oXKVMYGjoJS4wqfyS58JN-Vd6e");
        postsPhotos.add("https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg");

        PostsDto.CreateAccountRequest createAccountRequest=PostsDto.CreateAccountRequest.builder()
                .postsTitle(postsTitle)
                .postsContents(postsContents)
                .postsPhotos(postsPhotos)
                .postsLocation(postsLocation)
                .build();
        String token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTIwNTc0MDksImFjY291bnRJZCI6MSwiYWNjb3VudEVtYWlsIjoiZG50anI0NzcyQG5hdmVyLmNvbSJ9.ceBcJeIUf9aUsORAfNJT521rHdDfxH5bGp-dnWRP7dc";

        mockMvc.perform(post("/api/posts")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createAccountRequest)))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    public void Posts_태그포함생성_성공() throws Exception{
        //When
        //Given
        String postsTitle="내 작업공간 태그포함2";
        String postsContents="이런거 있어어2";
        String postsLocation="수원시 팔달구2";
        List<String> postsPhotos=new ArrayList<>();
        postsPhotos.add("https://lh3.googleusercontent.com/proxy/kr-1BRXpuhgwIVpc5pcfcVV-nEsUduJldGbOpvAUwxHeNK--u7fWsYXfb3PccxrDHvj-HyjDFEyVxUmjQ4oXKVMYGjoJS4wqfyS58JN-Vd6e");
        postsPhotos.add("https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg");
        List<TagDto.Tag> postsTags=new ArrayList<>();
        Tag tag1=tagRepository.findByTagTitle("요리사");
        Tag tag2=tagRepository.findByTagTitle("테라스");
        postsTags.add(modelMapper.map(tag1,TagDto.Tag.class));
        postsTags.add(modelMapper.map(tag2,TagDto.Tag.class));

        PostsDto.CreateAccountRequest createAccountRequest=PostsDto.CreateAccountRequest.builder()
                .postsTitle(postsTitle)
                .postsContents(postsContents)
                .postsPhotos(postsPhotos)
                .postsLocation(postsLocation)
                .postsTags(postsTags)
                .build();
        String token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTI0NTE1MzcsImFjY291bnRJZCI6MSwiYWNjb3VudEVtYWlsIjoiZG50anI0NzcyQG5hdmVyLmNvbSJ9.MPlBQEI5Jksjy7qRVs9My9504ZtWRKAE3EiBU6oRH7A";

        mockMvc.perform(post("/api/posts")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createAccountRequest)))
                .andExpect(status().isCreated())
                .andDo(print());
    }
}
package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseControllerTest;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Post.PostsDto;
import org.junit.Test;
import org.springframework.http.MediaType;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class PostsControllerTest extends BaseControllerTest {
    // TODO: 2021-01-25 게시글 생성은 되는데 무한루프 오류뜸 
    @Test
    public void Posts_생성_성공() throws Exception{
        //When
        //Given
        String postsTitle="내 작업공간 어때??";
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
        String token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTE1NzU4MzUsImFjY291bnRJZCI6NX0.t_2NAzSXVJfbavs_18PB1JAZB3HDLGISNUSvbHja6p0";

        mockMvc.perform(post("/api/posts")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createAccountRequest)))
                .andExpect(status().isCreated())
                .andDo(print());
    }
}
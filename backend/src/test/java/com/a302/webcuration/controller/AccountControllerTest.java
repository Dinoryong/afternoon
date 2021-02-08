package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseControllerTest;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
import com.a302.webcuration.domain.Tag.Tag;
import com.a302.webcuration.domain.Tag.TagDto;
import com.a302.webcuration.domain.Tag.TagRepository;
import org.junit.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class AccountControllerTest extends BaseControllerTest {
    @Autowired
    TagRepository tagRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Test
    public void Account_조회_성공() throws Exception {
        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTMxMzI1NDUsImFjY291bnRJZCI6MjQsImFjY291bnRFbWFpbCI6ImRudGpyNDc3MkBuYXRlLmNvbSJ9.hgRt267I8KSFMMtft7YaV7Wr8NjFMe2KO-f590IHdOU";

        mockMvc.perform(get("/api/accounts")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void Account_생성_성공() throws Exception {
        //When
        AccountDto.CreateAccountRequest createAccountRequest = AccountDto.CreateAccountRequest.builder()
                .accountName("한우석")
                .accountNickname("VVS우석")
                .accountEmail("dntjr4772@naver.com")
                .build();

        mockMvc.perform(post("/api/accounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createAccountRequest)))
                .andExpect(status().isCreated())
                .andDo(print());

    }

    @Test
    public void Account_생성_BadRequest_Wrong_Format() throws Exception {
        //When
        Account createAccountRequest = Account.builder()
                .accountId(12L)
                .accountEmail("tgi@na.com")
                .accountName("5")
                .accountNickname("TestNickname")
                .build();

        mockMvc.perform(post("/api/accounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createAccountRequest)))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    public void Account_생성_BadRequest_WrongInput() throws Exception {
        //When
        AccountDto.CreateAccountRequest createAccountRequest = AccountDto.CreateAccountRequest.builder()
                .accountEmail("tgi")
                .accountName("5")
                .accountNickname("TestNickname")
                .build();

        mockMvc.perform(post("/api/accounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createAccountRequest)))
                .andExpect(status().isBadRequest())
                .andDo(print());

    }

    @Test
    public void Account_생성_BadRequest_EmptyInput() throws Exception {
        //When
        AccountDto.CreateAccountRequest createAccountRequest = AccountDto.CreateAccountRequest.builder().build();

        mockMvc.perform(post("/api/accounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createAccountRequest)))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    public void Account_update_성공() throws Exception {


        AccountDto.UpdateRequest request = new AccountDto.UpdateRequest();
        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTMxODkyMzQsImFjY291bnRJZCI6MjQsImFjY291bnRFbWFpbCI6ImRudGpyNDc3MkBuYXRlLmNvbSJ9.QU_FxH4hw6qHQEU2mYmbe4729DXqkmeD0k0lop-_3EY";
        request.setAccountBio("최재웅이");
        request.setAccountNickname("GS재웅님");
        request.setAccountPhoto("https://image.chosun.com/sitedata/image/202002/06/2020020602404_0.png");
        mockMvc.perform(put("/api/accounts/")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void Account_update_실패() throws Exception {

        String Id = "7";

        AccountDto.UpdateRequest request = new AccountDto.UpdateRequest();
        request.setAccountBio("안녕하세요");
        request.setAccountNickname("dntjrrr");

        mockMvc.perform(put("/api/accounts/"+Id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isAccepted())
                .andDo(print());
    }

    //-------------------------------------팔로잉-------------------------------------
    @Test
    public void follow_성공() throws Exception {

        Long yourId = 27L;

        AccountDto.FollowRequest request =new  AccountDto.FollowRequest();
        request.setYourId(yourId);


        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTMxODkyMzQsImFjY291bnRJZCI6MjQsImFjY291bnRFbWFpbCI6ImRudGpyNDc3MkBuYXRlLmNvbSJ9.QU_FxH4hw6qHQEU2mYmbe4729DXqkmeD0k0lop-_3EY";
        mockMvc.perform(put("/api/accounts/myfollowing")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void follow_실패_셀프팔로우() throws Exception {

        Long yourId = 2L;

        AccountDto.FollowRequest request =new  AccountDto.FollowRequest();
        request.setYourId(yourId);


        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTI2NzcyODEsImFjY291bnRJZCI6MiwiYWNjb3VudEVtYWlsIjoiamFzb245NjdAbmF2ZXIuY29tIn0.2LJZlzsu2fkXOqyOa4szyBKy-iW-wFBOPnZZQpD008E";
        mockMvc.perform(put("/api/accounts/my-following")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    public void follow_실패_없는사람() throws Exception {

        Long yourId = 11L;

        AccountDto.FollowRequest request =new  AccountDto.FollowRequest();
        request.setYourId(yourId);


        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTI2NzcyODEsImFjY291bnRJZCI6MiwiYWNjb3VudEVtYWlsIjoiamFzb245NjdAbmF2ZXIuY29tIn0.2LJZlzsu2fkXOqyOa4szyBKy-iW-wFBOPnZZQpD008E";
        mockMvc.perform(put("/api/accounts/my-following")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    public void follow_실패_이상한값() throws Exception {

        Long yourId = -1L;

        AccountDto.FollowRequest request =new  AccountDto.FollowRequest();
        request.setYourId(yourId);


        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTI2NzcyODEsImFjY291bnRJZCI6MiwiYWNjb3VudEVtYWlsIjoiamFzb245NjdAbmF2ZXIuY29tIn0.2LJZlzsu2fkXOqyOa4szyBKy-iW-wFBOPnZZQpD008E";
        mockMvc.perform(put("/api/accounts/my-following")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    public void 관심태그지정_성공() throws Exception{
        AccountDto.AccountTagRequest accountTagRequest=new AccountDto.AccountTagRequest();
        String tagName="아기방";
        Tag tag=tagRepository.findByTagTitle(tagName);
        accountTagRequest.getTags().add(modelMapper.map(tag, TagDto.Tag.class));

        tagName="캠핑";
        tag=tagRepository.findByTagTitle(tagName);
        accountTagRequest.getTags().add(modelMapper.map(tag, TagDto.Tag.class));

        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTMxODkyMzQsImFjY291bnRJZCI6MjQsImFjY291bnRFbWFpbCI6ImRudGpyNDc3MkBuYXRlLmNvbSJ9.QU_FxH4hw6qHQEU2mYmbe4729DXqkmeD0k0lop-_3EY";
        mockMvc.perform(put("/api/accounts/mytag")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(accountTagRequest)))
                .andExpect(status().isOk())
                .andDo(print());
    }
    //--------------------------------------태그 기준 피드------------------------------------------------------
    @Test
    public void 태그기준피드_성공() throws Exception{
        String Id = "1";
        mockMvc.perform(get("/api/accounts/feed/"+Id)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    //--------------------------------------팔로잉 기준 피드------------------------------------------------------
    @Test
    public void 팔로잉기준피드_성공() throws Exception{
        String Id = "1";
        mockMvc.perform(get("/api/accounts/feed/follow/"+Id)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }
}
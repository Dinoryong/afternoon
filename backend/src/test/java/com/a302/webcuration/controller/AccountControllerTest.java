package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseControllerTest;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
import org.junit.Test;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class AccountControllerTest extends BaseControllerTest {


    @Test
    public void Account_profile_조회_성공() throws Exception {

        Long id = 1L;
        mockMvc.perform(get("/api/accounts/" +Long.toString(id))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void Account_조회_성공() throws Exception {
        mockMvc.perform(get("/api/accounts")
                .header("Authorization","BlahBlah")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void Account_생성_성공() throws Exception {
        //When
        AccountDto.CreateAccountRequest createAccountRequest = AccountDto.CreateAccountRequest.builder()
                .accountName("한우석")
                .accountNickname("dntjr22")
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

        String Id = "8";

        AccountDto.UpdateRequest request = new AccountDto.UpdateRequest();
        request.setAccountDesc("안녕하세요");


        mockMvc.perform(put("/api/accounts/"+Id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isAccepted())
                .andDo(print());

    }

    @Test
    public void Account_update_실패() throws Exception {

        String Id = "7";

        AccountDto.UpdateRequest request = new AccountDto.UpdateRequest();
        request.setAccountDesc("안녕하세요");
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

        Long yourId = 7L;

        AccountDto.FollowRequest request =new  AccountDto.FollowRequest();
        request.setYourId(yourId);


        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTIwNzUxOTMsImFjY291bnRJZCI6OCwiYWNjb3VudEVtYWlsIjoiamFzb245NjdAbmF2ZXIuY29tIn0.oSNxdvgG04n3aiDdrIR3_22OHsc_tMvb1c1mJ26sLAs";
        mockMvc.perform(put("/api/accounts/my-following")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void follow_실패_셀프팔로우() throws Exception {

        Long yourId = 8L;

        AccountDto.FollowRequest request =new  AccountDto.FollowRequest();
        request.setYourId(yourId);


        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTIwNzUxOTMsImFjY291bnRJZCI6OCwiYWNjb3VudEVtYWlsIjoiamFzb245NjdAbmF2ZXIuY29tIn0.oSNxdvgG04n3aiDdrIR3_22OHsc_tMvb1c1mJ26sLAs";
        mockMvc.perform(put("/api/accounts/my-following")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    public void follow_실패_없는사람() throws Exception {

        Long yourId = 1L;

        AccountDto.FollowRequest request =new  AccountDto.FollowRequest();
        request.setYourId(yourId);


        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTIwNzUxOTMsImFjY291bnRJZCI6OCwiYWNjb3VudEVtYWlsIjoiamFzb245NjdAbmF2ZXIuY29tIn0.oSNxdvgG04n3aiDdrIR3_22OHsc_tMvb1c1mJ26sLAs";
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


        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTIwNzUxOTMsImFjY291bnRJZCI6OCwiYWNjb3VudEVtYWlsIjoiamFzb245NjdAbmF2ZXIuY29tIn0.oSNxdvgG04n3aiDdrIR3_22OHsc_tMvb1c1mJ26sLAs";
        mockMvc.perform(put("/api/accounts/my-following")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }


}
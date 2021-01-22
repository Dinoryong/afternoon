package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseControllerTest;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
import org.junit.Test;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
                .header("Auth-Token","BlahBlah")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void Account_생성_성공() throws Exception {
        //When
        AccountDto.CreateAccountRequest createAccountRequest = AccountDto.CreateAccountRequest.builder()
                .accountName("Test")
                .accountNickname("TestNickname")
                .accountEmail("Test@test.com")
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

    //---------------------------------로그인-------------------------------------------

    @Test
    public void Login_이메일요청_성공() throws Exception {

        AccountDto.LoginRequest account = new AccountDto.LoginRequest();
        account.setAccountEmail("jason967@naver.com");

        mockMvc.perform(post("/api/accounts/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(account)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void Login_이메일요청_실패_형식오류() throws Exception {

        AccountDto.LoginRequest account = new AccountDto.LoginRequest();
        account.setAccountEmail("ㄹasdkom");

        mockMvc.perform(post("/api/accounts/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(account)))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    public void Login_이메일요청_실패_존재하지않음() throws Exception {

        AccountDto.LoginRequest account = new AccountDto.LoginRequest();
        account.setAccountEmail("none@test.com");

        mockMvc.perform(post("/api/accounts/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(account)))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    public void Login_AuthKey_성공() throws Exception {

        AccountDto.LoginAuthKeyRequest account = new AccountDto.LoginAuthKeyRequest();
        account.setAccountEmail("jason967@naver.com");
        account.setAccountAuthNum("w7z3ti68");

        mockMvc.perform(post("/api/accounts/login/auth")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(account)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void Token_얻어오기_AccountId() throws Exception {
        mockMvc.perform(get("/api/accounts/login/user")
                .header("Authorization","Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTEyNzMwODcsImFjY291bnRJZCI6Mn0.KijOVp6eYCP0g3L4skvSVDmPZXb3h18ItGCEgcveRpE")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    //-------------------------------------팔로잉-------------------------------------
    @Test
    public void follow_성공() throws Exception {

        String yourId = "3";
        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTEyODM1NzIsImFjY291bnRJZCI6Mn0.lyWtT3TXdFCKaCnnjTYAv6KXwr86s31JNGFNPLdarh8";
        mockMvc.perform(post("/api/accounts/follow/"+yourId)
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());

    }

    @Test
    public void follow_실패() throws Exception {

        String yourId = "2";
        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTEyODM1NzIsImFjY291bnRJZCI6Mn0.lyWtT3TXdFCKaCnnjTYAv6KXwr86s31JNGFNPLdarh8";

        mockMvc.perform(post("/api/accounts/follow/"+yourId)
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andDo(print());

    }


}
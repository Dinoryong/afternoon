package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseControllerTest;
import com.a302.webcuration.domain.Account.AccountDto;
import org.junit.Test;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class LoginControllerTest extends BaseControllerTest {


    //---------------------------------로그인-------------------------------------------

    @Test
    public void Login_이메일요청_성공() throws Exception {

        AccountDto.LoginRequest account = new AccountDto.LoginRequest();
        account.setAct("login-request");
        account.setAccountEmail("dntjr4772@naver.com");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(account)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void Login_이메일요청_실패_형식오류() throws Exception {

        AccountDto.LoginRequest account = new AccountDto.LoginRequest();
        account.setAct("login-request");
        account.setAccountEmail("ㄹasdkom");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(account)))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    public void Login_이메일요청_실패_존재하지않음() throws Exception {

        AccountDto.LoginRequest account = new AccountDto.LoginRequest();
        account.setAct("login-request");
        account.setAccountEmail("none@test.com");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(account)))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    public void Login_AuthKey_Off_성공() throws Exception {

        String AuthKey = "7acqdaj6";

        AccountDto.LoginRequest  account = new AccountDto.LoginRequest();
        account.setAct("check-authKey-off");
        account.setAccountEmail("dntjr4772@naver.com");
        account.setAccountAuthKey(AuthKey);

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(account)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void Login_AuthKey_Off_실패() throws Exception {

        String AuthKey = "qqvyne13!";

        AccountDto.LoginRequest  account = new AccountDto.LoginRequest();
        account.setAct("check-authKey-off");
        account.setAccountEmail("dntjr4772@naver.com");
        account.setAccountAuthKey(AuthKey);

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(account)))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    public void Login_AuthKey_On_성공() throws Exception {

        String AuthKey = "7acqdaj6";

        AccountDto.LoginRequest  account = new AccountDto.LoginRequest();
        account.setAct("check-authKey-on");
        account.setAccountEmail("dntjr4772@naver.com");
        account.setAccountAuthKey(AuthKey);

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(account)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void auto_login_성공() throws Exception {

        String AuthKey = "6j4v3guk";
        Long id = 24L;
        String email = "dntjr4772@naver.com";
        AccountDto.LoginRequest  account = new AccountDto.LoginRequest();
        account.setAccountEmail(email);
        account.setAccountId(id);

        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTMxMTYwODQsImFjY291bnRJZCI6MjQsImFjY291bnRFbWFpbCI6ImRudGpyNDc3MkBuYXZlci5jb20ifQ.BpeSjW2avZkVLnqCUF_uSY89dmfSYwmfF5W0XPLfPMs";
        mockMvc.perform(post("/api/auto-login")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization","Bearer "+token)
                .content(objectMapper.writeValueAsString(account)))
                .andExpect(status().isOk())
                .andDo(print());
    }

}

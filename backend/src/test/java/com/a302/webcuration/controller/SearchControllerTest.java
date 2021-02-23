package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseControllerTest;
import org.junit.Test;
import org.springframework.http.MediaType;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class SearchControllerTest extends BaseControllerTest {
    @Test
    public void 비로그인_Account_검색_성공() throws Exception {
        String nickname="GS재웅님";
        mockMvc.perform(get("/api/search/logout/" +nickname)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }
    @Test
    public void 로그인_Account_검색_성공() throws Exception {
        String nickname="VVS우석";
        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTMxODkyMzQsImFjY291bnRJZCI6MjQsImFjY291bnRFbWFpbCI6ImRudGpyNDc3MkBuYXRlLmNvbSJ9.QU_FxH4hw6qHQEU2mYmbe4729DXqkmeD0k0lop-_3EY";
        mockMvc.perform(get("/api/search/login/" +nickname)
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void 비로그인_Tag_검색_성공() throws Exception {
        String name="캠핑";
        mockMvc.perform(get("/api/search/logout/" +name)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }
    @Test
    public void 로그인_Tag_검색_성공() throws Exception {
        String name="개발자";
        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTQ0MzA1MjcsImFjY291bnRJZCI6NjUsImFjY291bnRFbWFpbCI6ImRudGpyNDc3MkBuYXZlci5jb20ifQ.kYB_CJVdff9g7yz7dX2URa-s5L8YpnhTJ2UBR-88e8U";
        mockMvc.perform(get("/api/search/login/" +name)
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }
}
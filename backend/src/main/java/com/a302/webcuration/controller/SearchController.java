package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.service.SearchService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/search")
@RequiredArgsConstructor
@Api
public class SearchController {
    private final SearchService searchService;
    //비로그인 상태
    @GetMapping("/logout/{name}")
    public ResponseEntity search(@PathVariable String name){
        BaseMessage bm =searchService.search(name,null);
        return new ResponseEntity(bm,bm.getHttpStatus());
    }
    //로그인 상태
    @GetMapping("/login/{name}")
    public ResponseEntity searchLoggedIn(@PathVariable String name,@RequestHeader(value = "Authorization") String token){
        BaseMessage bm =searchService.search(name,token);
        return new ResponseEntity(bm,bm.getHttpStatus());
    }
}

package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.service.FeedService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/feed")
@RequiredArgsConstructor
@Api
public class FeedController {
    private final FeedService feedService;
    private static final Logger logger = LoggerFactory.getLogger(FeedController.class);

    @GetMapping
    public ResponseEntity findByMyTagAndFollowing(@RequestHeader(value = "Authorization") String token){
        BaseMessage bm =feedService.findByMyTagAndFollowing(token);
        return new ResponseEntity(bm,bm.getHttpStatus());
    }

}

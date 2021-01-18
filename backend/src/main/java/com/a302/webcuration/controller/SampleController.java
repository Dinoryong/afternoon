package com.a302.webcuration.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SampleController {

    @GetMapping(value = "/sample")
    public String sample()
    {
        return "sample";
    }
}

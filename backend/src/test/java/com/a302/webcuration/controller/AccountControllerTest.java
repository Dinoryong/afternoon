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
                .accountName("최재웅")
                .accountNickname("GS재웅")
                .accountEmail("dntjr4772@nate.com")
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

    // TODO: 2021-02-07 수정필요 id넣는게 아니라 header에서 꺼내서
    @Test
    public void Account_update_성공() throws Exception {

        String Id = "24";

        AccountDto.UpdateRequest request = new AccountDto.UpdateRequest();
        request.setAccountBio("안녕하세요");
        request.setAccountPhoto("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAAFUCAMAAAD1feXmAAAA8FBMVEX////l0XgAAADu4rDp1Xru2X3r13vw237v47P8/Pzz8/PFtGejo6Ph4eHl0Hbm04AfHx+7u7ufkVNlZWXX19ejlVMzLxuajFHXxHGPj48rLjZ/f3+2pl+ampppaWkPDw/r6+utra3GxsYnIADQvm2EeEVsYjgVEgDp2ZJycnLAwMDPz89aUi+snVpCPCNzaTwzMzMoKChAQEAAAAu9rWMfGQCMgElxZztMRSVXV1eGhoZaUSRNRBpLS0wVGCEREhXs3qPo144gHREtKRgeGxAACyI1N0AyKwILEB9MTVNBQ0giJCtFPRtRSSBGQCEiHQCjINKlAAANaElEQVR4nO2dCXfaOBeG8Y1sBUNoISwmgRBSlpIA2SgBkrRJ6ExnpjPT//9vvisbA15ky8Ym852j55w2LDJ60XIl3SuLTEYikUgkEolEIpFIJBKJRCKRSCQSiUTyHydbPHK+cK7b71weeVKfX+qe1xKh/BFsFpnMHUB5+908wIX16Nl85/zs7Jw9qz+zJwAf01F1BhuyOv6X3373BmBgPsha7wys50WUk2X/O79CkqJacwSzB11vhYg6BjjGZ02zjFIVdcP+tv9/RGEbO3sfUd/qi8Vi7icqiyU1d4liIvPpi1rjEaXfAjy7RLVub2+/rUVdpSKquNE0z7hFnbOXXaJWrETd3F2kIitrk/GIujLLL0iU1cYSRq9vWLTdouos10unqOOsnm1uiWonL+oUtil+dIpixsuyCbzel8pAk3eIKjtFXVmvngeISqf3HZXL7MPr5fJROZN1Vh8W1N2NZQT2Kwq5BDbs6s1ms+4Y+xaseupWs9m7qIVZRc+rKlyLYnJuM7rVmLdFZfchCmuotWnytig27jDbWLT+ckxCWqLKqx5Wvrq63GpTA7u7L8wHlqj5WlQrTYuOTX3zhfUtu1Ne62vCnZ6x3rn4uKJVxyf4mnc6mhDFedF+2L45y9qPs2sTlHW9Y3N620xLkwNPxoHv8FNLJBKJRCKR7EC7mdp0jEc23zwPTHAOT/D1NDhNsrSPMcvTwCTNPjUaPThJa0rtQh/89mlq0BoEpoIRUYhGR7jqTH+2ePETeoZKiKIEOhouwMAkikLI5BGaKfmZ7bx+h0pHZbkpam8ekLD9gyoWRM09QT09SVcnUFEIWWU2+iMg6f1olYylpJ0p/JnKIjLbhKcK3WSl0IB1YfZ+spWSlRbKStxE6Cgpp2xnpKif+I3qCqjigGjKNOlKvPr6lNOIK58pv1HNp67EiKY9Jbnm1v+CCfXmopjOLV+OfURhhVfgd+4lEVlAT/HLwwBeVz+Hht8F2Emu4TQJs3XxBxiqXw6K8onXSHTwvwAbYufxZHeX8xmM/GrOzOCRJyr/xLmE2YfGKvgSm4vf/nG3763Pb/BGmvojp2zNy5QfO/lz5jDiSsJPz/FEnVxr/MuwwdecQaIN+tEaTns9+uvJt4GvRXV4vj7IBV2H1qHDgqLblC8vBs/Pz183zuyv+HRwcenK4QimNPCjFcozn2GiFGI8/rGOFecXpop+vw+1LcwXGIv8usPWYRTQMEzUT8WYorC99+5RlX45YDGG4azUmFCEbMGeTxql2ZBFiQZmoKG+mnvEEzUJvVbRHgftu2+YYbdjUJwLcQwbUanR6WKyb3ftOnTCP1f94i+qDUbotViDmNNbN6fyu/c6qabmum9Mf1jdIdr1ia+o4qeQxmhdPZ2NaLgiWxcdDYcC31UhFZ4ogW/EJjSCiuzkgXYmTFT7i5CodCCln76ifvrOEfaGv/U8qbynKCpFSVFSlBQlRSUm6mfQzP69RA3+fs8BeeS/cC/+ek9Ru82npKj/qiiROfqeRQmtZtKCt5oJXPcVCsqHFfgwjEiJTXjrvqAVcuHzy8HhipfXkIwKH15e1ok/K0KyuL6E5x5nNYS5HB5sOHz5EJhBpMQWJMfzM9X/4Yj6cODk8HPQtz84dCZ+ESgqvtPsiFN/hQMP/I8vvBy60h6+Coj6m+cnzP7s+or64M7m4DDg8z1f4DCsDSrMO8xzqR5ByU9U4XMUUT7fQECUwvWoQt83feHVmw+/8brbn5gobcopqjbPJHjaVFDb9bapAxGbQMc3fprOYcYZZgqvjg6Fxifw850W4fBAxCQoZOIbA1oA33Qqr2vTefjy8iH4qzOrZnMQamlt6IOPUbiAaYAjqVAofGbgsCEyyhReWeLXglDqFcZq7/82N+OQGXqkHAqRUptoFc8s/SowILAXCLiDfjfVd5xMrUSNXEV1wYmqOa/yd1BzkqqqKp7eRO07i+quGjIVJppGK6Ua/hHIiKhGafq2nFVqRhSvLXG2qquwglJNTz1jOSJh7l7NWK5jNQ9GlOL6tV1UdyFdj05bm5jQuBsc1SAlx/0QVYF4w+bKTVHp0A369kSpOrKBfpAqOgQX4ZEZO6MObLZjLwKXDER5c2fT4udDPJpAJDZjoT7crwOGN/8G2oOlN5s+7wKt60n7DDPRBSVOQO3tBsXAmJo69WbT5geBvF+gXYeacAVW71aiBvyhmNVz35PNXYbXUNSxV1ReB/fOEC5Y0Kv6g4eA4tWuvdncZPKcUYl6E2PbnYtEEk1wVWMttbiTOyvZyE9UG/yXYzgt8lZf5lZkvLBQx7emqOav4GReVXn9G0eUok083eLoGLi7MLzfamotAD+Og2ucGO587vAfL+RFiLdZvQlbKntUDp+0EMWbT0BIn7iswrLB20ziBzVv4ioKlC1tuExiJ8jyaEbDTtca1jpRJOHFpv08FumvhE66FlOUNwzcjcGSGzZRpy+sUem4LB6KhY41BjWG0JqkOx+ESxyMI0Rpaa3P2ZWVHAbksZ2LD+IKNuFa2tNmbfg10xR2KtJGFVqKUEB/F9QhZE79HQgeiIrjzbW4wYkNWqoM9ITaudbBDp7Dpm5tsxGaqscUlUNRQ4EKIUoNoEepMepZ9ufhehJtI0cEURMUJbK2Ur4DjKjhmDDMQjc2xWUpsGlK0RpLbE2q4R5qxFcEkaBVAVFqhQ11xGi5Rb2lI0qthu/kwiUitnDWUz2kJGqZ6YeaqTfTvPrNKdMRpV1nwhwbuEA0jcb+RJFSJsyJgNVmWky/ufq7iSK2dfXOKAOX1WmKIjVYefyJ0nNquk7LeoaLKm1shtrZ6oEV3ibuPYvCQZlOShWkRELnuFFnnLFFmXmZhH9yJ/YoFF2UKCpvYRhOaqLoMH7fTEsUzomWO7WpkOVxLFFYUPHd8igqZECOJYrWcEYYVxMbkEPyjCMKNX3fYTKvhs6nYohSa9ASdv3EFRUxAyynfm0Xa89mnsG3gOA0Xmy5Y6dXptAydhupv2fCjByFapRIBqkG+bOFPgJXMzchBaFF6d0qLqJ3XbCydV8+xD2FaUS7N8HmBLX4I7EFziYzzVCf2dKzlvLPVu3McImx84RG7UGmDCHbO7H/DZ0vGDW/ZCyoNExiKQinAv4pMnTcIESw6B48FUonOFuu7Fp1lqhmJnMctr2TdABtFbEljZaArdmRPVGZq3aciDeNjFjMYRHq88S2DmN2swzR1AnOiLu0B1X7zk92pxN7cdxIxptm+jzDo6KseGbstqJSid0wxBwbhDlhDFXTNNWoTfFFmCblG6JmzF0PsekmqrJa9k0rpgtIzW2v4se+N8zGwg7OzP8W8VlXsGvlcoZdIITmeha1XERPeXA+Iyvi1xby6Wg43Dhbt2YRYWOAAHT2zQwYnQvFCHH5Ht0IRff2GfbNlrczkb0GHWhF7F/EqEadi9m1x+5UFEkfvajoWDj4aKP17A1LITsAVuBwU4syTyK0CyFBOx82N/DOhWJGHfgeRRMa+WVUSdv798X2KakPEaLmpPEG15HHHbq9W4m7Hc+RkdESjeNoxjgwTsnLobN9+7XITbmmtX0TEa+xyd4sF32iTnuOfXmBuwA2Fw3hOsz0ENXoAbRqMaz8Ov6/QjSWVYWQLUEqC0sse7GsvDq839aEVkGoqNgE7zt/9CXUeMDxuaTEmhNji3LtSRdrVeZSE6oNHJfd03aiEQPXMtCfxh2e6fCr6/iKLFyLdRbNYBF+FkTX7NvZVZUak0mPTWZmtdhRSmfXs4tKdEjQlC6rJDbpM6nM3pZm3KY6newwY3B1vVVRiW+qNO8O39p9Nh5Xu6MKjRzud3zmyO8UowsoRSh5rLPcGlVVPY0sKtSz9dRkIL5NxtK1Zjc5JmrX/1Y6HfzvJtgHaDc5Z6jk43mnk0AbA+80mxvhbWoJo06tM8P9OILhuxQVaQQdtXYJo9R3aPiJ6gcdHxZhS1+CaNWQs3Vuk3FTRIGWwg64KsN4z5q0UsjZfaaq0l7v0iTG6mcpAjndqyqitPgnh20xgMrezBXbRSOiianaV1mxBZLouYVYVntRRZTevVg57U8V233POWbr3VQRpS9cd7aqUcqtnZWTeN3ZqtKdXRHlS2RNzF79m6jj0Ak7xzS6JuaL+bV7pMUfQnowiHeGafmvlAyWlvs3UrdzchbDxxQKwTndz10OvmwDJL2nmhjX4HvTqjj6bbJ7cwlr4bv/SE8dYJRYN9Q6PXhO4pTe7By+JBPpMOO58Vu4k/IN9Do77xUmSinR33zK5u/hYTdZKKkPx8kezZvNmxG+mLIs3+w8hQPFmyhrRGIEGwlljraES8lGR1k/ujkaqS+iotEwnVJakb06Bfgy7Qi6o9gtuaUZADRTPkJcL7I7sa4bHS3QcceC4IbRfQS4XezlsPWjPPvFp9ls1FCo5Y51qGGHedKVY3Y+2ONp+dnzpvkrU33o1mq13JZTD5+WltaJrPm0a82Pq8v28/OJz5ZwdnYt50CbPcEO9h2c2hTx2fm76pFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJxMH/AHr5RE4z0zixAAAAAElFTkSuQmCC");
        request.setAccountBio("최재웅입니다.");
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

        Long yourId = 47L;

        AccountDto.FollowRequest request =new  AccountDto.FollowRequest();
        request.setYourId(yourId);


        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTI5NzM2NTQsImFjY291bnRJZCI6MjQsImFjY291bnRFbWFpbCI6ImRuZ25nbjMwNDVAZ21haWwuY29tIn0._YW2dOJTevv6KWvYRkM5ao96txD553Ua9cKZvOVmz30";
        mockMvc.perform(put("/api/accounts/my-following")
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

        tagName="와인룸";
        tag=tagRepository.findByTagTitle(tagName);
        accountTagRequest.getTags().add(modelMapper.map(tag, TagDto.Tag.class));

        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTMxMjA0NzgsImFjY291bnRJZCI6MjQsImFjY291bnRFbWFpbCI6ImRudGpyNDc3MkBuYXRlLmNvbSJ9.aGZxP4OaAXOSKF008vy7IXod6vdFkmvCFHzGR3btOgU";
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
package com.a302.webcuration.domain.Account;

import com.a302.webcuration.domain.Sample.Sample;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

public class AccountDto {

    @Getter
    @Setter
    @Builder
    public static class FollowRequest {
        @NotNull
        private Long aId;
        @NotNull
        private Long bId;
    }
}

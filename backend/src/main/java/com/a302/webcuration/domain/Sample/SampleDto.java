package com.a302.webcuration.domain.Sample;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class SampleDto {

    private final ModelMapper modelMapper;

    public SampleDto(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Getter @Setter @Builder
    public static class RegSampleRequest {

        @Min(0)
        private int userAge;
        @NotNull
        private String userName;
        @NotNull
        @Email
        private String userEmail;


        public Sample toEntity()
        {
            return Sample.builder()
                    .userAge(this.userAge)
                   .userName(this.userName)
                    .build();
        }
    }

}

package com.a302.webcuration.service;

import com.a302.webcuration.domain.Account.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final AccountRepository accountRepository;
    private final JavaMailSender mailSender;

    public static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    @Async
    public void sendMail(String email, String authCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("[PINSET] 로그인(이메일) 인증 코드 발송");
        message.setText("이메일 인증코드는 "+authCode+" 입니다.");
        logger.info("message"+message);
        mailSender.send(message);
    }

    //이메일 인증코드 생성
   public String createEmailCode() {
        String[] str = {"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
                "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9"};
        String newCode = new String();
        for (int x = 0; x < 8; x++) {
            int random = (int) (Math.random() * str.length);
            newCode += str[random];
        }
        return newCode;
    }
}

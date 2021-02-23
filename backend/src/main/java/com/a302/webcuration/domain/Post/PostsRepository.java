package com.a302.webcuration.domain.Post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostsRepository extends JpaRepository<Posts,Long> {
    Posts findPostsByPostsId(Long id);
    @Query(value = "select p.postsId, p.postsTitle, p.postsFirstPhoto, w.accountNickname from Account a join a.tags t join t.posts p join p.postWriter w where a.accountId = :accountId")
    List<Object[]> selectByMyTag(@Param("accountId") Long accountId);
    @Query(value = "select p.postsId, p.postsTitle, p.postsFirstPhoto, f.accountNickname from Account a join a.following f join f.myPosts p where a.accountId = :accountId")
    List<Object[]> selectByMyFollowing(@Param("accountId") Long accountId);
    //이 태그를 관심태그로 지정한 유저의 수
    @Query(value = "select count(a) from Tag t join t.accounts a where t.tagId = :tagId")
    Long selectsInterestedPeopleCnt(@Param("tagId") Long tagId);
    //이 태그 관련 제일 인기 많은 받은 게시물 top3
    //could not initialize proxy - no Session 에러 발생 -> application.properties에 치트키코드 추가시 되긴하나 성능저하 문제로 좋지않은 방법
//    @Query(value = "select p.postsId, p.likeAccounts.size from Tag t join t.posts p where t.tagId = :tagId order by p.likeAccounts.size DESC")
//    List<Object[]> selectsMostPopularPosts(@Param("tagId") Long tagId);
    //개선한 jpql
    @Query(value = "select p.postsId from Tag t join t.posts p join p.likeAccounts a where t.tagId = :tagId group by p.postsId order by count(a) DESC")
    List<Long> selectsMostPopularPosts(@Param("tagId") Long tagId);
    //이 태그에 top contributor top3
    @Query(value = "select a.accountNickname,a.accountPhoto from Tag t join t.posts p join p.postWriter a where t.tagId = :tagId group by a.accountId order by count(a) DESC")
    List<Object[]> selectsMostContributor(@Param("tagId") Long tagId);

}

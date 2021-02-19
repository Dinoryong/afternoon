import color from "../styles/theme";

const TagList = [
  {
    tagId: 1,
    tagTitle: "개발자",
    tagDesc:
      "오랜 시간 나는 그토록 비싸고, 그토록 첨단인 무엇이 그토록 쓸모 없을 수 있는지 이해하지 못했다. 그러다가 컴퓨터는 놀랍도록 똑똑한 것을 할 수 있는 멍청한 기계이고, 컴퓨터 프로그래머는 놀랍도록 멍청한 짓을 할 수 있는 똑똑한 사람이라는 생각이 들었다.  즉, 둘은 완벽한 한 쌍이다",
    tagColor: color.pastel.a,
    tagSrc: "/assets/images/prefer/1.jpg",
  },
  {
    tagId: 2,
    tagTitle: "스키",
    tagDesc:
      "자신을 시험해 볼 수 있는 한 가지 방법은 자연환경에 부딪혀 보는 것이다. 숲과 산에는, 자연이 던지는 어려움에 대항하여 자신을 시험해 볼 수 있는 기회가 많이 있다. 스키는 진정한 용기가 필요한 것이다.",
    tagColor: color.pastel.b,
    tagSrc: "/assets/images/prefer/2.jpg",
  },
  {
    tagId: 3,
    tagTitle: "카페",
    tagDesc:
      "커피는 어둠처럼 검고, 재즈는 선율처럼 따뜻했다. 내가 그 조그만 세계를 음미할 때 풍경은 나를 축복했다.",
    tagColor: color.pastel.c,
    tagSrc: "/assets/images/prefer/3.jpg",
  },
  {
    tagId: 4,
    tagTitle: "헬스",
    tagDesc: "나는 내가 피곤할 때 멈추지 않는다. 나는 내가 끝마쳤을때 멈춘다.",
    tagColor: color.pastel.d,
    tagSrc: "/assets/images/prefer/4.jpg",
  },
  {
    tagId: 5,
    tagTitle: "캠핑",
    tagDesc:
      "캠핑한다는 것은 완전히 말 그대로 '사는 것' 이다. 현재를 위해 과거와 미래를 잊는 것이다. 그것은 가슴을 열어 숨을 쉬는 것이고 모든 것을 즐기는 것이다.",
    tagColor: color.pastel.e,
    tagSrc: "/assets/images/prefer/5.jpg",
  },
  {
    tagId: 6,
    tagTitle: "패션",
    tagDesc:
      "패션은 드레스에만 존재하는 것이 아니다. 하늘에도 거리에도 있고, 아이디어, 우리가 사는 방식, 일어나는 일 모두 관련이 있다.",
    tagColor: color.pastel.f,
    tagSrc: "/assets/images/prefer/6.jpg",
  },
  {
    tagId: 7,
    tagTitle: "메이크업",
    tagDesc:
      "고맙게도 화장은 하는 것보다 지우는 것이 더 쉬워서 잘 지우면 다시 원래 모습이 된다.",
    tagColor: color.pastel.g,
    tagSrc: "/assets/images/prefer/7.jpg",
  },
  {
    tagId: 8,
    tagTitle: "클라이밍",
    tagDesc:
      "등반은 상대가 아닌 본인과의 부단한 싸움을 통해 극기를 하면서 새로운 길을 찾고 만족을 얻는다. 처절한 본인과의 싸움을 통해, 그리고 무한한 상상력을 통해 길을 개척해서 만들어 가는 행위다.",
    tagColor: color.pastel.h,
    tagSrc: "/assets/images/prefer/8.jpg",
  },
  {
    tagId: 9,
    tagTitle: "테니스",
    tagDesc:
      "모든 경기에서 다른 무엇보다 가장 중요한 요소는 바로 '너는 너다' 라는 것이다. 네 자신을 알라. 분노는 경기를 더 잘하는데 도움이 되지 않는다. 상대방을 보기 위해 절대 공에서 눈을 떼지 마라. 네 최고의 샷을 구사할 수 있는 기회가 올 때까지 기다려라.",
    tagColor: color.pastel.i,
    tagSrc: "/assets/images/prefer/9.jpg",
  },
  {
    tagId: 10,
    tagTitle: "요리",
    tagDesc:
      "대체 이 세상에서 참으로 기쁨을 주는 것이 몇 가지나 될까, 손꼽아 헤어 보니 확실히 첫 손가락으로 꼽는 것은 음식물이다. 그러므로 집에서 언제 식사하는지 안 하는 지를 알아보는 것은 사람의 현우를 알 수 있는 확실한 시험이다.",
    tagColor: color.pastel.j,
    tagSrc: "/assets/images/prefer/10.jpg",
  },
  {
    tagId: 11,
    tagTitle: "카메라",
    tagDesc:
      "나는 구름을 통해 내 삶의 철학을 기록하고 싶었다. 사진 속에는 현실이 있고 이것은 때때로 진짜 현실보다 더욱 현실적인 불가사의한 힘을 지니고 있다.",
    tagColor: color.pastel.k,
    tagSrc: "/assets/images/prefer/11.jpg",
  },
  {
    tagId: 12,
    tagTitle: "서재",
    tagDesc:
      "때로 독서란 독자를 가르친다기보다 머리를 도리어 산만하게 한다. 덮어놓고 많은 책을 읽는 것보다 몇몇 좋은 저자의 책을 골라 읽는 편이 훨씬 더 유익하다.",
    tagColor: color.pastel.l,
    tagSrc: "/assets/images/prefer/12.jpg",
  },
  {
    tagId: 13,
    tagTitle: "게임",
    tagDesc:
      "하나의 게임에서 승리하려면 너는 먼저 그 게임의 규칙을 배워야한다. 그런 다음에는 몰입하여 그 게임 자체를 즐겨야 한다.",
    tagColor: color.pastel.m,
    tagSrc: "/assets/images/prefer/13.jpg",
  },
  {
    tagId: 14,
    tagTitle: "스킨스쿠버",
    tagDesc:
      "이 세상의 70%는 바다 속에 있고, 이 세상 아름다움의 70%는 바다 속에 있다.",
    tagColor: color.pastel.n,
    tagSrc: "/assets/images/prefer/14.jpg",
  },
  {
    tagId: 15,
    tagTitle: "악기",
    tagDesc:
      "나는 세상의 모든 전쟁으로부터 눈을 감고 조용히 음악의 나라로, 그 믿음의 나라로 들어가리, 거기에는 우리의 모든 절망과 고통들이 소리의 바다로 사라지리라.",
    tagColor: color.pastel.o,
    tagSrc: "/assets/images/prefer/15.jpg",
  },
  {
    tagId: 16,
    tagTitle: "고양이방",
    tagDesc:
      "고양이는 세상 모두가 자기를 사랑해 주길 원하지 않는다. 다만, 자기가 선택한 사람이 자기를 사랑해 주길 바랄 뿐이다.",
    tagColor: color.pastel.p,
    tagSrc: "/assets/images/prefer/16.jpg",
  },
];

export default TagList;

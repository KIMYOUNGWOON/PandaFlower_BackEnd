# 📍Panda Flower - Backend

**엘리스 SW 트랙 6기 1차 프로젝트** <br>
쇼핑몰 웹 서비스 제작 프로젝트 <br>

<br>

## 1. 프로젝트 기간 & 인원

- 프로젝트 기간: 약 2주 (2023.10.02 ~ 2023.10.13)
- 개발 인원:  
  `Frontend`: 임정훈, 주효원, 김수환 <br>
  `Backend`: 김영운, 이정혜, 김영욱 <br>

<br>

## 2. 사용 기술

- **BackEnd** <br>

  JavaScript <br>
  Node.js <br>
  express <br>
  passport <br>
  mongoDB <br>
  mongoose <br>
  Rest API <br>
  배포: NginX, PM2, GCP

<br>

- **협업** <br>

  Git & Git lab <br>
  Postman <br>
  discord <br>
  Notion <br>
  Gather <br>
  Figma

<br>

## 4. 핵심 기능

쇼핑몰 웹사이트의 핵심 기능으로 크게 `사용자 관련`, `상품 관련`, `장바구니 관련`, `주문 관련` 기능을 구현하였습니다.

<br>

# 📍사용자 관련 기능

<br>

**1. 회원가입**

- 회원가입 폼의 입력 값이 빈값으로 들어올 시 키에러를 반환합니다. (프론트에서 사용자에게 알려주기 위해 어떤 값이 빈값인지 해당하는 키에러를 반환)
- 정규표현식을 사용하여 이메일, 비밀번호, 핸드폰 번호의 유효성을 검증합니다. (이메일 - elice@elice.com / 비밀번호 - 최소 8자 이상, 대소문자 상관없이 적어도 영문 하나 포함, 적어도 숫자 하나 포함, 적어도 특수문자 하나 포함 / 핸드폰 번호 - 010-0000-0000)
- 비밀번호 입력값과 비밀번호 확인 입력값이 일치하는지 검증한 후 불일치 시 에러 메시지를 반환합니다.
- 기 가입된 이메일로 중복 가입 시도 시 가입이 불가하도록 에러 메시지를 반환합니다.
- 회원가입 성공시 사용자 정보를 유저 DB에 저장합니다. 이때 bcrypt를 사용하여 비밀번호는 암호화를 진행한 후 DB에 저장합니다.

<br>

**2. 로그인**

- 사용자가 입력한 이메일이 DB에 있는지 확인 후 없을 시 에러 메시지를 반환합니다.
- DB내 저장된 암호화 된 비밀번호와 사용자가 입력한 비밀번호를 bcrypt로 비교 후 불일치 시 에러 메세지를 반환합니다.
- jwt를 활용하여 로그인 성공 시 payload에 userId, isAdmin이 담긴 accessToken을 발급합니다.

<br> 
  
**3. 인가(Authorization)**
- `마이페이지`, `장바구니`, `주문`, `결제` 기능 이용 시 accessToken을 복호화하여 payload의 userId 확인 후 가입된 고객만 사용 가능하도록 인가 middleware를 구현했습니다.
- payload 내 userId가 DB에서 확인되지 않을 경우 유효하지 않은 user라는 에러 메시지를 반환합니다.

<br>

**6. 마이페이지**

- **사용자 정보 조회:** 인가 middleware를 이용해서 accessToken을 복호화하여 userId를 가져와 해당 ID로 DB에서 일치하는 ID의 사용자 정보를 가져옵니다.
- **사용자 정보 수정:** itemId, quantity 수량을 요청 바디로 전달 받아서 카트 DB에 저장합니다.
- **사용자 정보 삭제:** 삭제할 상품이 없는 경우

<br>

**6. 장바구니 CRUD**

- **조회:** accessToken을 확인하여 해당 유저의 장바구니 상품을 조회합니다.
- **생성:** itemId, quantity 수량을 요청 바디로 전달 받아서 카트 DB에 저장합니다.
- **삭제:** 삭제할 상품이 없는 경우

<br>

**7. 주문** 📌[코드 확인](https://github.com/walwald/44-1st-four-branch-backend/blob/034a67411cad420e16100865b4ccef38cd4ab8ee/models/orderDao.js#L50)

- 배송 주소 별도 저장 후, 주문 정보와 주문 상품 정보를 DB에 저장합니다.
- uuid를 사용하여 고유 주문 번호를 생성 했습니다.
- MySql의 transaction 기능을 활용하여 `주문 정보 저장`과 `주문 상품 정보 저장`이 함께 이루어지고, 에러 발생 시 함께 철회되도록 구현했습니다.
  <br>

**8. 포인트 결제** 📌[코드 확인](https://github.com/walwald/44-1st-four-branch-backend/blob/034a67411cad420e16100865b4ccef38cd4ab8ee/models/orderDao.js#L4)

- 회원이 보유한 포인트에서 주문 총액이 차감되는 API입니다.
- MySql의 transaction 기능을 활용하여 `고객 포인트 차감`, `주문 및 주문 상품 상태 업데이트 (결제 대기 -> 결제 완료)`, `카트 내역 삭제`가 함께 동작하며, 에러 발생 시 함께 철회되도록 구현했습니다.
- 주문 총액이 보유 포인트보다 적을 경우 에러를 반환합니다.

</div>
</details>
<br>

<br>

## 5. 핵심 트러블슈팅

**1. 상품 조회 API - productDao 쿼리문 효율화**

## 6. 느낀점/회고

> 1차 프로젝트 회고:

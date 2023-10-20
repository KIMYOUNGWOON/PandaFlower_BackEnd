# Panda Flower - Backend

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

## 3. 핵심 기능

쇼핑몰 웹사이트의 핵심 기능으로 크게 `사용자 관련`, `상품 관련`, `장바구니 관련`, `주문 관련` 기능을 구현하였습니다.

<br>

## 4. 내가 맡은 기능

사용자 관련 기능 <br>
장바구니 관련 기능 <br>
주문 관련 기능 <br>

<br>

# 📍 사용자 관련 기능

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
- `마이페이지`, `장바구니`, `주문`, `결제` 기능 이용 시 accessToken을 복호화하여 payload의 userId 확인 후 가입된 고객만 접근이 가능하도록 인가 middleware를 구현했습니다.
- payload 내 userId가 DB에서 확인되지 않을 경우 유효하지 않은 user라는 에러 메시지를 반환합니다.

<br>

**4. 마이페이지**

- **사용자 정보 조회:** 사용자는 개인 페이지에서 자신의 회원 정보를 조회할 수 있습니다. 인가 middleware를 이용해서 accessToken을 복호화하여 payload에 담겨 있는 userId를 가져와 해당 ID로 DB에서 일치하는 ID의 사용자 정보를 가져옵니다.
- **사용자 정보 수정:** 사용자는 개인 페이지에서 자신의 회원 정보(비밀번호, 주소)를 수정할 수 있습니다. accessToken의 payload에서 userId를 확인하고 req.body로 수정할 데이터를 전달 받아서 해당 사용자의 정보를 수정합니다.
- **사용자 정보 삭제:** 사용자는 개인 페이지에서 자신의 회원 정보를 삭제(탈퇴)할 수 있다. 전달 받은 accessToken를 복호화하여 payload 안에 담겨 있는 userId를 활용해 DB에서 일치하는 사용자 document를 찾아서 삭제합니다.

<br>

# 📍 장바구니 관련 기능

**장바구니 CRUD**

- **조회:** 사용자는 장바구니에 담긴 상품 목록을 확인할 수 있다. accessToken을 확인하여 해당 유저의 오브젝트 ID를 추출하여 카트 컬렉션에서 해당 ID 등록된 장바구니 상품을 찾아서 보여줍니다.
- **생성:** 사용자는 상품을 장바구니에 추가할 수 있다. accessToken에서 추출한 사용자의 오브젝트 ID를 활용하여 해당 사용자의 장바구니 목록을 가져옵니다. 장바구니가 비어있다면 req.body로 전달 받은 아이템 ID와 수량을 사용자의 ID와 함께 카트 컬렉션에 생성합니다. 만약 장바구니가 비어있지 않다면 불러온 장바구니 목록에서 동일한 상품이 있는지 확인하고 동일한 상품이 있을 경우 해당 상품의 수량만 증가하도록 합니다.
- **수정:** 사용자는 장바구니에 속한 상품의 수량을 수정할 수 있습니다. 수정할 아이템의 ID와 수량를 req.body로 전달 받아 accessToken에서 추출한 사용자의 ID와 아이템 ID를 활용해 둘다 일치하는 장바구니 상품을 찾아서 수량을 업데이트합니다.
- **삭제:** 사용자는 장바구니에서 버튼 1번의 클릭으로, 장바구니 전체 상품을 제거할 수 있습니다. accessToken에서 추출한 사용자 오브젝트 ID로 등록된 장바구니 상품들을 카트 컬렉션에서 전부 삭제합니다. 사용자는 장바구니에서 일부 상품을 골라서 제거할 수 있습니다. 만약 req.body로 전달 받은 상품 ID가 있다면 해당 상품만 카트 컬렉션에서 삭제합니다. req.body로 전달받은 상품이 없다면 전체 삭제합니다.

<br>

# 📍 주문 관련 기능

## • 사용자

- **주문하기:** 사용자는 장바구니에 속한 상품들로 주문을 진행할 수 있습니다.
- **주문수정:** 사용자는 주문 완료 후 배송이 시작되기 전까지 주문 정보를 수정할 수 있습니다.
- **결제완료:** 결제 완료 시, 주문 완료 페이지로 이동합니다.
- **주문조회:** 사용자는 개인 페이지에서 자신의 주문 내역을 조회할 수 있습니다.
- **주문취소:** 사용자는 개인 페이지에서 자신의 주문 내역을 취소할 수 있다.
- **주문정보:** 사용자는 개인 페이지에서 자신의 주문 내역을 취소할 수 있다.

  <br>

## • 관리자

- **주문수정:** 관리자는 사용자의 주문 내역에서 배송 상태를 수정할 수 있다.
- **주문조회:** 관리자는 관리 페이지에서 사용자들의 주문 내역을 조회할 수 있다.
- **주문삭제:** 관리자는 관리 페이지에서 사용자들의 주문 내역을 삭제할 수 있다.

<br>

# 📍 폴더 구조

<br>

# 📍 트러블 슈팅

**1. CORS 에러**

**1. CORS 에러**

# 📍 느낀점/회고

> 엘리스 1차 프로젝트 회고:블로그 주소

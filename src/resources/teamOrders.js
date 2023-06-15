// 팀 오더를 정의합니다.
import { orders } from "./orders";

export const teamOrders = {};
orders.forEach((order) => {
  const teamID = order.teamID;
  if (teamID) {
    if (teamOrders[teamID]) {
      teamOrders[teamID] += 1; // 이미 해당 팀의 주문이 있을 경우 1 증가
    } else {
      teamOrders[teamID] = 1; // 해당 팀의 첫 번째 주문인 경우 1로 초기화
    }
  }
});
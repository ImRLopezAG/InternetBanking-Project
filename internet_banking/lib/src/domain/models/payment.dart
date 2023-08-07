import 'package:internet_banking/src/src.dart';

class PaymentModel extends BaseModel{
  String? sender;
  String? receptor;
  int? type;
  int? amount;

  PaymentModel({
    this.sender,
    this.receptor,
    this.type,
    this.amount,
  });

  PaymentModel.fromJson(Map<String, dynamic> json) {
    sender = json['sender'];
    receptor = json['receptor'];
    type = json['type'];
    amount = json['amount'];
  }

  Map<String, dynamic> toJson() {
    return {
      'sender': sender,
      'receptor': receptor,
      'type': type,
      'amount': amount,
    };
  }

}
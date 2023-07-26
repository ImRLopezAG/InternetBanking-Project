import 'package:internet_banking/src/src.dart';

class PaymentModel extends BaseModel{
  String? sender;
  String? receptor;
  int? amount;

  PaymentModel({
    this.sender,
    this.receptor,
    this.amount,
  });

  PaymentModel.fromJson(Map<String, dynamic> json) {
    sender = json['sender'];
    receptor = json['receptor'];
    amount = json['amount'];
  }

  Map<String, dynamic> toJson() {
    return {
      'sender': sender,
      'receptor': receptor,
      'amount': amount,
    };
  }
}
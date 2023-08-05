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

  PaymentModel setSender({required String sender}) {
    this.sender = sender;
    return this;
  }

  PaymentModel setReceptor({required String receptor}) {
    this.receptor = receptor;
    return this;
  }

  PaymentModel setType({required int type}) {
    this.type = type;
    return this;
  }

  PaymentModel setAmount({required int amount}) {
    this.amount = amount;
    return this;
  }
}
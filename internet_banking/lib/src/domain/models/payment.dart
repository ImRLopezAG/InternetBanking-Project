import 'package:internet_banking/src/src.dart';

class PaymentModel extends BaseModel{
  String? sender;
  String? receptor;
  String? owner;
  String? receptorUser;
  int? type;
  int? amount;

  PaymentModel({
    this.sender,
    this.receptor,
    this.type,
    this.amount,
    this.owner,
    this.receptorUser,
  });

  PaymentModel.fromJson(Map<String, dynamic> json) {
    sender = json['sender'];
    receptor = json['receptor'];
    type = json['type'];
    amount = json['amount'];
    owner = json['owner'];
    receptorUser = json['receptorUser'];
  }

  Map<String, dynamic> toJson() {
    return {
      'sender': sender,
      'receptor': receptor,
      'type': type,
      'amount': amount,
      'owner': owner,
      'receptorUser': receptorUser,
    };
  }

}
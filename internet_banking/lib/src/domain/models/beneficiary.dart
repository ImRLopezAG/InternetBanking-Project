import 'package:internet_banking/src/src.dart';

class BeneficiaryModel extends BaseModel{
  String? sender;
  String? receptor;

  BeneficiaryModel({
    this.sender,
    this.receptor,
  });

  BeneficiaryModel.fromJson(Map<String, dynamic> json) {
    sender = json['sender'];
    receptor = json['receptor'];
  }

  Map<String, dynamic> toJson() {
    return {
      'sender': sender,
      'receptor': receptor,
    };
  }
}
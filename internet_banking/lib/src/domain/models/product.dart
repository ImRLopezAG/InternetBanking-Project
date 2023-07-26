import 'package:internet_banking/src/src.dart';

class ProductModel extends BaseModel{
  int? pin;
  int? cvv;
  String? expirationDate;
  String? cardNumber;
  String? cardHolder;
  int? balance;
  int? limit;
  bool? principal;
  bool? active;
  String? user;
  String? type;

  ProductModel({
    this.pin,
    this.cvv,
    this.expirationDate,
    this.cardNumber,
    this.cardHolder,
    this.balance,
    this.limit,
    this.principal,
    this.active,
    this.user,
    this.type,
  });

  ProductModel.fromJson(Map<String, dynamic> json) {
    pin = json['pin'];
    cvv = json['cvv'];
    expirationDate = json['expirationDate'];
    cardNumber = json['cardNumber'];
    cardHolder = json['cardHolder'];
    balance = json['balance'];
    limit = json['limit'];
    principal = json['principal'];
    active = json['active'];
    user = json['user'];
    type = json['accountType'];
  }

  Map<String, dynamic> toJson() {
    return {
      'pin': pin,
      'cvv': cvv,
      'expirationDate': expirationDate,
      'cardNumber': cardNumber,
      'cardHolder': cardHolder,
      'balance': balance,
      'limit': limit,
      'principal': principal,
      'active': active,
      'user': user,
      'accountType': type,
    };
  }

}
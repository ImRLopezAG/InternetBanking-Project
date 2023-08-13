
import 'package:internet_banking/src/src.dart';

class PaymentBuilder{
  final PaymentModel _payment = PaymentModel();

  static final PaymentBuilder _instance = PaymentBuilder._internal();
  PaymentBuilder._internal();
  factory PaymentBuilder() => _instance;
  
  PaymentModel build() {
    return _payment;
  }

  PaymentBuilder setSender({required String sender}) {
    _payment.sender = sender;
    return this;
  }

  PaymentBuilder setReceptor({required String receptor}) {
    _payment.receptor = receptor;
    return this;
  }

  PaymentBuilder setType({required int type}) {
    _payment.type = type;
    return this;
  }

  PaymentBuilder setAmount({required int amount}) {
    _payment.amount = amount;
    return this;
  }

  PaymentBuilder setOwner({required String owner}) {
    _payment.owner = owner;
    return this;
  }

  PaymentBuilder setReceptorUser({required String receptorUser}) {
    _payment.receptorUser = receptorUser;
    return this;
  }
}
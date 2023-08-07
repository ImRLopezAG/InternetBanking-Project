
import 'package:internet_banking/src/domain/domain.dart';

class BeneficiaryBuilder{
  final BeneficiaryModel _beneficiary = BeneficiaryModel();

  static final BeneficiaryBuilder _instance = BeneficiaryBuilder._internal();
  BeneficiaryBuilder._internal();
  factory BeneficiaryBuilder() => _instance;

  BeneficiaryModel build() {
    return _beneficiary;
  }

  BeneficiaryBuilder setSender({required String sender}) {
    _beneficiary.sender = sender;
    return this;
  }

  BeneficiaryBuilder setReceptor({required String receptor}) {
    _beneficiary.receptor = receptor;
    return this;
  }
}
import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';

class TransferForm extends StatefulWidget {
  const TransferForm({Key? key}) : super(key: key);

  @override
  State<TransferForm> createState() => _TransferFormState();
}

class _TransferFormState extends State<TransferForm> {
  final _formKey = GlobalKey<FormState>();
  final Map<String, TextEditingController> _controllers = {
    'accountNumber': TextEditingController(),
    'amount': TextEditingController(),
  };
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: 20.0,
        vertical: 10.0,
      ),
      child: Form(
        key: _formKey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Text(
              'Transaction',
              style: TextStyle(
                fontSize: 40.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(
              height: 10.0,
            ),
            TextForm(
              controller: _controllers['accountNumber']!,
              label: 'Account Number',
              hint: 'Enter account number',
              keyboardType: TextInputType.number,
              prefixIcon: const Icon(
                Icons.account_balance,
              ),
            ),
            const SizedBox(
              height: 10.0,
            ),
            TextForm(
              controller: _controllers['amount']!,
              label: 'Amount',
              hint: 'Enter amount',
              keyboardType: TextInputType.number,
              prefixIcon: const Icon(
                Icons.money,
              ),
            ),
            const SizedBox(
              height: 10.0,
            ),
            SubmitButton(
              onPressed: () async {},
            ),
          ],
        ),
      ),
    );
  }
}

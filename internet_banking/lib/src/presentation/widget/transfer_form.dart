import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';
import 'package:provider/provider.dart';

class TransferForm extends StatefulWidget {
  final bool isBeneficiary;
  final ProductModel? product;
  const TransferForm({
    Key? key,
    this.isBeneficiary = false,
    this.product,
  }) : super(key: key);

  @override
  State<TransferForm> createState() => _TransferFormState();
}

class _TransferFormState extends State<TransferForm> {
  final _formKey = GlobalKey<FormState>();
  final Map<String, TextEditingController> _controllers = {
    'accountNumber': TextEditingController(),
    'amount': TextEditingController(),
    'sender': TextEditingController(),
  };

  @override
  void initState() {
    super.initState();
    if (widget.isBeneficiary) {
      _controllers['accountNumber']!.text = widget.product!.pin!;
    }
  }

  @override
  void dispose() {
    _controllers.forEach((key, value) => value.dispose());
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final productProvider = Provider.of<ProductProvider>(context);
    final products = productProvider.products;
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
            DropdownButtonFormField<String>(
              decoration: InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ),
                prefixIcon: const Icon(
                  Icons.credit_card,
                ),
              ),
              hint: const Text('Select product'),
              items: products
                  .map(
                    (product) => DropdownMenuItem(
                      value: product.pin,
                      child: Text(
                        '${product.pin}',
                      ),
                    ),
                  )
                  .toList(),
              onChanged: (value) {
                _controllers['sender']!.text = value!;
              },
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
              label: 'Transfer',
              onPressed: () async {
                if (_formKey.currentState!.validate()) {
                  PaymentModel transaction = PaymentModel()
                    .setSender(sender: _controllers['sender']!.text)
                    .setReceptor(receptor: _controllers['accountNumber']!.text)
                    .setAmount(amount: int.parse(_controllers['amount']!.text))
                    .setType(type: 2);
                  
                  print(transaction.toJson());
                  Navigator.pop(context);
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}

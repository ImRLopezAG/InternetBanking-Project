import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';
import 'package:provider/provider.dart';

class TransferScreen extends StatelessWidget {
  const TransferScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<PaymentProvider>(context);
    final appProvider = Provider.of<AppProvider>(context);
    return Padding(
      padding: const EdgeInsets.all(10.0),
      child: FutureBuilder(
        future: provider.getTransactions(token: appProvider.token),
        builder:
            (BuildContext context, AsyncSnapshot<List<PaymentModel>> snapshot) {
          if (snapshot.hasData) {
            return ListView.builder(
              itemCount: provider.transactions.length,
              itemBuilder: (BuildContext context, int index) {
                final payment = provider.transactions[index];
                return _TransferCard(payment: payment);
              },
            );
          } else {
            return const PaymentSkeleton();
          }
        },
      ),
    );
  }
}

class _TransferCard extends StatelessWidget {
  final PaymentModel payment;
  const _TransferCard({Key? key, required this.payment}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final appProvider = Provider.of<AppProvider>(context);
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
        side: BorderSide(
          color: Colors.blue[800]!,
          width: 1.0,
        ),
      ),
      child: ListTile(
        title: Text(
          '${payment.receptor}',
          style: const TextStyle(
            fontSize: 20.0,
            fontWeight: FontWeight.bold,
          ),
        ),
        subtitle: Text(
          '${payment.receptorUser}',
          style: const TextStyle(
            fontSize: 15.0,
            fontWeight: FontWeight.bold,
            color: Colors.grey,
          ),
        ),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              '\$${payment.amount}',
              style: TextStyle(
                fontSize: 20.0,
                fontWeight: FontWeight.bold,
                color: payment.owner == appProvider.user.id
                    ? Colors.red
                    : Colors.green,
              ),
            ),
            Text(
              '${payment.sender}',
              style: const TextStyle(
                fontSize: 15.0,
                fontWeight: FontWeight.bold,
                color: Colors.grey,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

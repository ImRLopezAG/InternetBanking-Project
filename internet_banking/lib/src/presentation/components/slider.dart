import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';
import 'package:provider/provider.dart';

class Sliders extends StatefulWidget {
  final String title;
  const Sliders({
    Key? key,
    required this.title,
  }) : super(key: key);

  @override
  State<Sliders> createState() => _SlidersState();
}

class _SlidersState extends State<Sliders> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<BeneficiaryProvider>(context);
    return FutureBuilder<List<UserModel>>(
      future: provider.getAll(
        token: Provider.of<AppProvider>(context).token,
        id: Provider.of<AppProvider>(context).user.id!,
      ),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return Container(
            margin: const EdgeInsets.only(bottom: 10),
            width: double.infinity,
            height: 180,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Text(
                    snapshot.data!.isEmpty ? '' : widget.title,
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Expanded(
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: provider.beneficiaries.length,
                    itemBuilder: (_, int index) {
                      final beneficiary = provider.beneficiaries[index];
                      return _SliderCard(
                        beneficiary: beneficiary,
                      );
                    },
                  ),
                ),
              ],
            ),
          );
        } else {
          return const SizedBox();
        }
      },
    );
  }
}

class _SliderCard extends StatelessWidget {
  final UserModel beneficiary;
  const _SliderCard({Key? key, required this.beneficiary}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    final productProviders =
        Provider.of<ProductProvider>(context, listen: false);
    final appProvider = Provider.of<AppProvider>(context, listen: false);
    final product = productProviders.getPrincipalForOwner(
        owner: beneficiary.id!, token: appProvider.token);
    return Container(
      width: 100,
      height: 100,
      margin: const EdgeInsets.symmetric(
        horizontal: 8,
        vertical: 5,
      ),
      child: Column(
        children: [
          GestureDetector(
            onTap: () async => _showModal(
              context: context,
              child: TransferForm(
                isBeneficiary: true,
                product: await product,
              ),
            ),
            onLongPress: () => _deleteDialog(context: context),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(20),
              child: SizedBox(
                  width: 100,
                  height: 110,
                  child: CircleAvatar(
                    backgroundColor: Colors.blue[800],
                    radius: 50,
                    child: const Icon(
                      Icons.person,
                      size: 50,
                      color: Colors.white,
                    ),
                  )),
            ),
          ),
          const SizedBox(height: 5),
          Text(
            beneficiary.username!,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  void _showModal({required BuildContext context, required Widget child}) {
    showModalBottomSheet(
      elevation: 5,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      context: context,
      builder: (context) {
        return SingleChildScrollView(
          // Wrap with SingleChildScrollView
          child: Padding(
            padding: EdgeInsets.only(
              bottom: MediaQuery.of(context).viewInsets.bottom,
              right: 24.0,
              top: 24.0,
            ),
            child: child,
          ),
        );
      },
    );
  }

  void _deleteDialog({required BuildContext context}) {
    showDialog(
      context: context,
      builder: (context) {
        final provider = Provider.of<AppProvider>(context, listen: false);
        return AlertDialog(
          title: const Text('Delete Beneficiary'),
          content:
              const Text('Are you sure you want to delete this beneficiary?'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () async {
                final delete = BeneficiaryBuilder()
                    .setReceptor(receptor: beneficiary.id!)
                    .setSender(sender: provider.user.id!)
                    .build();
                await Provider.of<BeneficiaryProvider>(context, listen: false)
                    .deleteBeneficiary(
                        token: provider.token, beneficiary: delete);
                Navigator.pop(context);
              },
              child: const Text('Delete'),
            ),
          ],
        );
      },
    );
  }
}

import 'dart:async';

import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';
import 'package:provider/provider.dart';

class SideMenu extends StatefulWidget {
  final Function(int) onTap;
  const SideMenu({super.key, required this.onTap});

  @override
  State<SideMenu> createState() => _SideMenuState();
}

class _SideMenuState extends State<SideMenu> {
  @override
  Widget build(BuildContext context) {
    final appProvider = Provider.of<AppProvider>(context);
    return Drawer(
      width: MediaQuery.of(context).size.width * 0.6,
      child: ClipRRect(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            Container(
              height: 120.0,
              color: Colors.blue,
              padding: const EdgeInsets.symmetric(
                vertical: 15.0,
              ),
              child: Padding(
                padding: const EdgeInsets.only(top: 20.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    CircleAvatar(
                        radius: 50.0,
                        backgroundColor: Colors.blue[900]!,
                        child: const Icon(
                          Icons.person_rounded,
                          size: 50.0,
                        )),
                    const SizedBox(
                      width: 5.0,
                    ),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '${appProvider.user.firstName} ${appProvider.user.lastName}',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 20.0,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(
                          width: 20.0,
                        ),
                        Text(
                          '${appProvider.user.email}',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 10.0,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            ListTile(
              leading: const Icon(Icons.people_rounded),
              title: const Text('Beneficiary'),
              onTap: () {
                _showModal(
                  context: context,
                  child: const Text.rich(
                    TextSpan(
                      text: 'Beneficiary',
                      style: TextStyle(
                        fontSize: 20.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.edit_rounded),
              title: const Text('Edit Profile'),
              onTap: () {
                _showModal(
                  context: context,
                  child: const UserForm(isEdit: true),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.add_card_rounded),
              title: const Text('Payment'),
              onTap: () {
                _showModal(
                  context: context,
                  child: const PaymentForm(),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.add_shopping_cart_rounded),
              title: const Text('Transaction'),
              onTap: () {
                _showModal(
                  context: context,
                  child: const TransferForm(),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.app_shortcut_rounded),
              title: const Text('About'),
              onTap: () {
                showAboutDialog(
                    context: context,
                    applicationIcon: const Icon(Icons.museum_rounded),
                    applicationName: 'Internet Banking',
                    applicationVersion: '1.0');
              },
            ),
            ListTile(
              leading: const Icon(Icons.logout_rounded),
              title: const Text('Logout'),
              onTap: () {
                Navigator.pushNamedAndRemoveUntil(
                    context, '/login', (route) => false);
                Timer(const Duration(milliseconds: 500), () {
                  appProvider.logout();
                });
              },
            ),
          ],
        ),
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
}

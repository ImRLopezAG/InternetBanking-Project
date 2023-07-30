import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';
import 'package:provider/provider.dart';

class SideMenu extends StatelessWidget {
  final Function(int) onTap;
  const SideMenu({super.key, required this.onTap});
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
                onTap(3);
              },
            ),
            ListTile(
              leading: const Icon(Icons.edit_rounded),
              title: const Text('Edit Profile'),
              onTap: () {
                onTap(3);
              },
            ),
            ListTile(
              leading: const Icon(Icons.people_rounded),
              title: const Text('Beneficiary'),
              onTap: () {
                onTap(3);
              },
            ),
            ListTile(
              leading: const Icon(Icons.logout_rounded),
              title: const Text('Logout'),
              onTap: () {
                appProvider.logout();
                Navigator.pushNamedAndRemoveUntil(
                    context, '/login', (route) => false);
              },
            ),
          ],
        ),
      ),
    );
  }
}

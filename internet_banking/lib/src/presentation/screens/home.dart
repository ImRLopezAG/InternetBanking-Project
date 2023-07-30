import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final GlobalKey<ScaffoldState> _drawerKey = GlobalKey();
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final appProvider = Provider.of<AppProvider>(context);
    return Scaffold(
      key: _drawerKey,
      appBar: AppBar(
        leading: InkWell(
          onTap: () => _drawerKey.currentState!.openDrawer(),
          child: const Icon(Icons.menu_rounded),
        ),
        title: const Text('Home'),
        centerTitle: true,
      ),
      body: FutureBuilder<bool>(
        future: appProvider.setUser(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return IndexedStack(
              index: appProvider.homeIndex,
              children: _widgets,
            );
          } else {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }
        },
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
              icon: Icon(Icons.send_rounded), label: 'Transfer'),
          BottomNavigationBarItem(
              icon: Icon(Icons.payment_rounded), label: 'Payment'),
        ],
        currentIndex: appProvider.homeIndex,
        selectedItemColor: Colors.blue,
        unselectedItemColor: Colors.grey,
        onTap: (index) {
          appProvider.homeIndex = index;
          setState(() {});
        },
      ),
      drawer: SideMenu(
        onTap: _setWidgets,
      ),
    );
  }

  final _widgets = [
    const Text('Home'),
    const Text('Transfer'),
    const Text('Payment'),
    const Text('Beneficiary'),
  ];

  void _setWidgets(int index) {
    final appProvider = Provider.of<AppProvider>(context, listen: false);
    appProvider.homeIndex = index;
    setState(() {});
  }
}

class SideMenu extends StatelessWidget {
  final Function(int) onTap;
  const SideMenu({super.key, required this.onTap});
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ClipRRect(
        child: ListView(
          children: [
            const DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Text('Drawer Header'),
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

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
      appBar:
          TopBar(drawerKey: _drawerKey, title: _titles[appProvider.homeIndex]),
      drawer: SideMenu(onTap: _setWidgets),
      body: _widgets[appProvider.homeIndex],
      bottomNavigationBar: Container(
        height: 70.0,
        decoration: BoxDecoration(
          color: Colors.blue[900]!,
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(
              49.0,
            ),
            topRight: Radius.circular(
              49.0,
            ),
          ),
        ),
        child: Theme(
          data: Theme.of(context).copyWith(
            splashColor: Colors.transparent,
            highlightColor: Colors.transparent,
          ),
          child: BottomNavigationBar(
            currentIndex: appProvider.homeIndex,
            onTap: _setWidgets,
            backgroundColor: Colors.transparent,
            elevation: 0.0,
            selectedIconTheme: const IconThemeData(
              color: Colors.white,
              size: 30.0,
            ),
            items: const [
              BottomNavigationBarItem(
                icon: Icon(Icons.home_max_rounded),
                label: 'Home',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.attach_money_rounded),
                label: 'Transfer',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.payment_rounded),
                label: 'Payment',
              ),
            ],
          ),
        ),
      ),
    );
  }

  final _widgets = [
    const UserScreen(),
    const TransferScreen(),
    const PaymentScreen(),
  ];
  final _titles = [
    'Home',
    'Transfer',
    'Payment',
  ];
  void _setWidgets(int index) {
    final appProvider = Provider.of<AppProvider>(context, listen: false);
    appProvider.homeIndex = index;
    setState(() {});
  }
}

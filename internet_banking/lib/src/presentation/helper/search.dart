import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';
import 'package:provider/provider.dart';

class SearchBeneficiary extends SearchDelegate {
  @override
  String get searchFieldLabel => 'Search users';

  @override
  List<Widget>? buildActions(BuildContext context) {
    return [
      IconButton(
        onPressed: () => query = '',
        icon: const Icon(Icons.clear_rounded),
      ),
    ];
  }

  @override
  Widget? buildLeading(BuildContext context) {
    return IconButton(
      onPressed: () => close(context, null),
      icon: const Icon(Icons.arrow_back_rounded),
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    return const Center(
      child: Text('buildResults'),
    );
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    if (query.isEmpty) {
      return const Center(
        child:
            Icon(Icons.person_add_alt_rounded, size: 150, color: Colors.grey),
      );
    }

    final provider = Provider.of<UserProvider>(context, listen: false);
    final appProvider = Provider.of<AppProvider>(context, listen: false);
    final beneficiaryProvider =
        Provider.of<BeneficiaryProvider>(context);
    provider.searchUser(
        query: query,
        token: appProvider.token,
        beneficiaries: beneficiaryProvider.beneficiaries);

    return StreamBuilder<List<UserModel>>(
      stream: provider.suggestionStream,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          final users = snapshot.data!;
          return ListView.builder(
            itemCount: users.length,
            itemBuilder: (context, index) {
              final user = users[index];
              return _UserItem(user: user);
            },
          );
        } else {
          return const Center(
            child: CircularProgressIndicator(),
          );
        }
      },
    );
  }
}

class _UserItem extends StatelessWidget {
  const _UserItem({Key? key, required this.user}) : super(key: key);

  final UserModel user;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: const CircleAvatar(
        child: Icon(Icons.person_rounded),
      ),
      title: Text(user.username!),
      subtitle: Text(user.email!),
      trailing: const Icon(Icons.person_add_alt_rounded),
      onTap: () async {
        final provider =
            Provider.of<BeneficiaryProvider>(context, listen: false);
        final appProvider = Provider.of<AppProvider>(context, listen: false);
        await provider.addBeneficiary(token: appProvider.token, user: user);
        Navigator.pop(context);
      },
    );
  }
}

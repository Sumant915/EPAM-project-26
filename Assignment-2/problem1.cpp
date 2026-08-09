#include <bits/stdc++.h>
using namespace std;

int ans = 0;

void countXor(int node, int parent, int currXor,
              vector<int>& value,
              vector<vector<int>>& adj,
              int k) {

    currXor = currXor ^ value[node];

    if (currXor >= k)
        ans++;

    for (int child : adj[node]) {
        if (child != parent) {
            countXor(child, node, currXor, value, adj, k);
        }
    }
}

int main() {

    int n, k;
    cin >> n >> k;

    vector<int> value(n + 1);

    for (int i = 1; i <= n; i++) {
        cin >> value[i];
    }

    vector<vector<int>> adj(n + 1);

    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;

        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    countXor(1, -1, 0, value, adj, k);

    cout << ans << endl;

    return 0;
}
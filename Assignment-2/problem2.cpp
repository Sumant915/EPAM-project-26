#include <bits/stdc++.h>
using namespace std;

int main() {
    int N, M, D;
    cin >> N >> M >> D;

    vector<vector<int>> adj(N + 1);

    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;

        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    vector<int> dist(N + 1, -1);

    queue<int> q;

    // Start BFS from City 1
    dist[1] = 0;
    q.push(1);

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }

    int ans = 0;

    for (int i = 1; i <= N; i++) {
        if (dist[i] != -1 && dist[i] <= D) {
            ans++;
        }
    }

    cout << ans << endl;

    return 0;
}
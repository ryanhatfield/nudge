# Nudge

Often times, it's necessary to kick a container to get it to do what you want. You don't otherwise need to pass any information, you just want it to _do the needful_ and it isn't. This sometimes results in a firm Kick in the K8s, and can cause some very grumpy logs. If you want to be nice to your deployments, just give them a Nudge instead of a kick, it's more _like a gentle smack_.

The idea here is we just want to tell the container to do something in a secure way, without needing to create file watchers or otherwise modify the application code.

The initial use case is to use Nudge with the `vault-inject-command` [vault injector annotation](https://www.vaultproject.io/docs/platform/k8s/injector/annotations#vault-hashicorp-com-agent-inject-command), to facilitate the adoption of rotating credentials without the need to modify application code. Nudge should be added to a container definition, and started before the main application. Nudge is about as light as it can get, it's relying on K8s to handle security, see the [Security](#Security) section for details.

## Intended Implementation

* Add `nudge` to your Dockerfile see releases for binary downloads
* Start `nudge` before your application starts, as early as you can
  * This might be a service, part of the `CMD` call, or inside a custom entrypoint script
* When you need to run a pre-set command in the container, you `nudge` the exposed port
  * This port is only available to internal networks
  * This port should NOT be exposed, the private network within the pod will be enough
* On your pod, set the [vault injector annotation](https://www.vaultproject.io/docs/platform/k8s/injector/annotations#vault-hashicorp-com-agent-inject-command) to `wget -O - localhost:4325`
<!-- TODO: add more steps here -->

## Security

<!-- TODO: add more details here -->
Nudge is intentionally lean, with startup time prioritized over customization or security. There is intentions to add more security features, but all security should be handled on either side of the `nudge`.
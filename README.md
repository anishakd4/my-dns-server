# Some popular DNS servers

cloudfare: 1.1.1.1
google: 8.8.8.8

- DNS first requests a root server. Logically there are 13 root servers in the world.

# TLD means top level domain

- .com, .dev, .in etc all are TLD
- So firstly DNS server will get the IP of .dev
- DNS will cache the IP address of the .dev .
- Then DNS will query .dev server.
- .dev server will check for the Authoritative nave server, meaning who is handling the requested domain
- Couple of popular Authoritative name servers are google, godaddy.
- Dns will query then then authoritative name server for example google for the ip of the domain we are searching for.
- If we hit any website in browser and then we go to inspect element and see the request we can see the IP address address returned by authoritative name server is what showing in the inspect window.

## Types of records

- @ means we are talking about our main domain geekconvert.com
- blog means we are talking about blog.geekconvert.com
- Whenever DNS will query for geekconvert.com it will check for the A record with our name registrar.
- With CNAME record you have to give a address of a domain only.
- Let suppose DNS is looking for blog.geekconvert.com and it have a cname record in the name registrar. So DNS will get a CNAME record, then it will take the CNAME record address lets suppose hashnode.com then DNS will find the A record of the hashnode.com domain. SO the ip address of the hashnode.com will be the IP address of the the blog.geekconvert.com.
- We could have created a A record for blog.geekconvert.com with the hashnode ip but tomorrow if the ip changes for them then we have to update here also. But with CNAME they just have to update the A record of the hashnode.com with their name registrar.

- ns is a name server record.
- we can add a ns record with my name registrar like I can create a ns record for blog with ns.myserver.com in godaddy. This means name resolution for blog.geekconvert.com and any subdomain for blog.geekconvert.com will be happen via ns.myserver.com. DNS will make a DNS query to the the A record of ns.myserver.com.

## DNS

- DNS works on the UDP protocol and this works by default on port 53.

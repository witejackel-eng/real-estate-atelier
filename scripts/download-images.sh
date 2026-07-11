#!/bin/bash
BASE="public/images"

# Property 1: The Glass Villa - Goa
curl -sL "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80" -o "$BASE/property-glass-villa-1.jpg" &
curl -sL "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80" -o "$BASE/property-glass-villa-2.jpg" &
curl -sL "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80" -o "$BASE/property-glass-villa-3.jpg" &

# Property 2: Skyline Penthouse - Mumbai
curl -sL "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80" -o "$BASE/property-penthouse-1.jpg" &
curl -sL "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" -o "$BASE/property-penthouse-2.jpg" &
curl -sL "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80" -o "$BASE/property-penthouse-3.jpg" &

# Property 3: Garden House - Delhi NCR
curl -sL "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80" -o "$BASE/property-garden-1.jpg" &
curl -sL "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80" -o "$BASE/property-garden-2.jpg" &
curl -sL "https://images.unsplash.com/photo-1600573472591-ee6981cf81a0?w=1200&q=80" -o "$BASE/property-garden-3.jpg" &

# Property 4: Sea Breeze Apartment - Mumbai
curl -sL "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80" -o "$BASE/property-sea-1.jpg" &
curl -sL "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80" -o "$BASE/property-sea-2.jpg" &
curl -sL "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80" -o "$BASE/property-sea-3.jpg" &

# Property 5: Urban Duplex - Bangalore
curl -sL "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80" -o "$BASE/property-duplex-1.jpg" &
curl -sL "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80" -o "$BASE/property-duplex-2.jpg" &
curl -sL "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80" -o "$BASE/property-duplex-3.jpg" &

# Property 6: Family Estate - Pune
curl -sL "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=1200&q=80" -o "$BASE/property-family-1.jpg" &
curl -sL "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1200&q=80" -o "$BASE/property-family-2.jpg" &
curl -sL "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80" -o "$BASE/property-family-3.jpg" &

# Property 7: Heritage Residence - Jaipur
curl -sL "https://images.unsplash.com/photo-1600047508788-786f3865b4b9?w=1200&q=80" -o "$BASE/property-heritage-1.jpg" &
curl -sL "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=80" -o "$BASE/property-heritage-2.jpg" &
curl -sL "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=80" -o "$BASE/property-heritage-3.jpg" &

# Property 8: High-Rise Living - Hyderabad
curl -sL "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80" -o "$BASE/property-highrise-1.jpg" &
curl -sL "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80" -o "$BASE/property-highrise-2.jpg" &
curl -sL "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" -o "$BASE/property-highrise-3.jpg" &

# Property 9: Coastal Retreat - Alibaug
curl -sL "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80" -o "$BASE/property-coastal-1.jpg" &
curl -sL "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80" -o "$BASE/property-coastal-2.jpg" &
curl -sL "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80" -o "$BASE/property-coastal-3.jpg" &

# Hero / general images
curl -sL "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80" -o "$BASE/hero-main.jpg" &
curl -sL "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1600&q=80" -o "$BASE/hero-interior.jpg" &

# Neighborhood images
curl -sL "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80" -o "$BASE/neighborhood-delhi.jpg" &
curl -sL "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80" -o "$BASE/neighborhood-mumbai.jpg" &
curl -sL "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80" -o "$BASE/neighborhood-goa.jpg" &
curl -sL "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80" -o "$BASE/neighborhood-bangalore.jpg" &
curl -sL "https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=800&q=80" -o "$BASE/neighborhood-pune.jpg" &
curl -sL "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80" -o "$BASE/neighborhood-hyderabad.jpg" &

# Service images
curl -sL "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80" -o "$BASE/service-buy.jpg" &
curl -sL "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80" -o "$BASE/service-sell.jpg" &
curl -sL "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" -o "$BASE/service-rental.jpg" &
curl -sL "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80" -o "$BASE/service-invest.jpg" &
curl -sL "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&q=80" -o "$BASE/service-relocate.jpg" &
curl -sL "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80" -o "$BASE/service-staging.jpg" &
curl -sL "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80" -o "$BASE/service-valuation.jpg" &
curl -sL "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80" -o "$BASE/service-closing.jpg" &

# About / team placeholders
curl -sL "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&q=80" -o "$BASE/about-studio.jpg" &
curl -sL "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&q=80" -o "$BASE/team-1.jpg" &
curl -sL "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&q=80" -o "$BASE/team-2.jpg" &
curl -sL "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&q=80" -o "$BASE/team-3.jpg" &

# Sell page
curl -sL "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=1200&q=80" -o "$BASE/sell-hero.jpg" &

# City skyline
curl -sL "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80" -o "$BASE/city-skyline.jpg" &

# Contact page
curl -sL "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" -o "$BASE/contact-hero.jpg" &

wait
echo "All images downloaded"
ls -la "$BASE/" | wc -l

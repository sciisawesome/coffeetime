"use client";

import React from "react";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to Monospace</h1>
          <p className="max-w-2xl mx-auto">
            A modern platform built with Next.js, featuring Gruvbox theme
            support.
          </p>
        </section>
      </main>
    </div>
  );
}

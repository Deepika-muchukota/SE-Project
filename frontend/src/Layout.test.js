import React from 'react';
import { render, screen } from './test-utils';
import Layout from './Layout';

describe('Layout Component', () => {
  test('renders NavBar elements', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    expect(screen.getByText('Welcome to Reitz')).toBeInTheDocument();
    expect(screen.getByText('Finalize Order')).toBeInTheDocument();
    expect(screen.getByText('View Cart')).toBeInTheDocument();
  });

  test('renders main content area', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
}); 
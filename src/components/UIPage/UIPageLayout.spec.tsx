import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { UIPageLayout } from './UIPageLayout';

describe('<UIPageLayout />', () => {
  it('should print content', () => {
    render(() => (
      <UIPageLayout
        content={<p data-testid="custom-content">custom content</p>}
      />
    ));

    expect(
      screen.getByTestId('custom-content').textContent,
    ).toMatchInlineSnapshot(`"custom content"`);
  });

  it('should print header with a separator', () => {
    render(() => (
      <UIPageLayout
        header={<header data-testid="custom-header">custom header</header>}
        content={<p data-testid="custom-content">custom content</p>}
      />
    ));

    expect(
      screen.getByTestId('custom-header').textContent,
    ).toMatchInlineSnapshot(`"custom header"`);

    expect(screen.getAllByRole('separator')).toHaveLength(1);
  });

  it('should print navigation with separator', () => {
    render(() => (
      <UIPageLayout
        navigation={<nav data-testid="custom-navigation">custom header</nav>}
        content={<p data-testid="custom-content">custom content</p>}
      />
    ));

    expect(
      screen.getByTestId('custom-navigation').textContent,
    ).toMatchInlineSnapshot(`"custom header"`);

    expect(screen.getAllByRole('separator')).toHaveLength(1);
  });

  it('should print header and content, and both should have a separator', () => {
    render(() => (
      <UIPageLayout
        header={<header data-testid="custom-header">custom header</header>}
        navigation={
          <nav data-testid="custom-navigation">custom navigation</nav>
        }
        content={<p data-testid="custom-content">custom content</p>}
      />
    ));

    expect(
      screen.getByTestId('custom-header').textContent,
    ).toMatchInlineSnapshot(`"custom header"`);

    expect(
      screen.getByTestId('custom-navigation').textContent,
    ).toMatchInlineSnapshot(`"custom navigation"`);

    expect(screen.getAllByRole('separator')).toHaveLength(2);
  });
});

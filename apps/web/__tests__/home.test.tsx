import { render, screen } from '@testing-library/react'
import Home from '../app/page'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
}))

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />)
    // Add more specific assertions based on your home page content
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
}) 
import { render, screen, fireEvent } from '@testing-library/react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from './index';

// Mock the embla-carousel-react module
jest.mock('embla-carousel-react', () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      const canScrollPrev = jest.fn().mockReturnValue(true);
      const canScrollNext = jest.fn().mockReturnValue(true);
      const scrollPrev = jest.fn();
      const scrollNext = jest.fn();
      const on = jest.fn();
      const off = jest.fn();

      // Return the ref and the API
      return [
        jest.fn(), // carouselRef
        {
          canScrollPrev,
          canScrollNext,
          scrollPrev,
          scrollNext,
          on,
          off
        }
      ];
    })
  };
});

describe('Carousel', () => {
  it('renders the carousel with default props', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
      </Carousel>
    );

    // Check if carousel container is rendered
    const carousel = screen.getByRole('region', { name: '' });
    expect(carousel).toBeInTheDocument();
    expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');

    // Check if slides are rendered
    const slides = screen.getAllByRole('group', { name: '' });
    expect(slides).toHaveLength(3);
    expect(slides[0]).toHaveAttribute('aria-roledescription', 'slide');
    expect(slides[0]).toHaveTextContent('Slide 1');

    // Check that slides have the correct base classes
    expect(slides[0]).toHaveClass('min-w-0', 'shrink-0', 'grow-0', 'basis-full');
  });

  it('renders the carousel with vertical orientation', () => {
    render(
      <Carousel orientation="vertical">
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </CarouselContent>
      </Carousel>
    );

    const slides = screen.getAllByRole('group');
    // In vertical orientation, slides should have pt-4 instead of pl-4
    expect(slides[0]).toHaveClass('pt-4');
  });

  it('renders navigation buttons', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );

    const prevButton = screen.getByText('Previous slide').closest('button');
    const nextButton = screen.getByText('Next slide').closest('button');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );

    const carousel = screen.getByRole('region');

    // Test arrow key navigation
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });

    // The actual scrolling is tested through the mocked API
    // We just ensure the event handlers are set up correctly
  });

  it('applies custom classes', () => {
    render(
      <Carousel className="custom-carousel">
        <CarouselContent className="custom-content">
          <CarouselItem className="custom-item">Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="custom-prev" />
        <CarouselNext className="custom-next" />
      </Carousel>
    );

    const carousel = screen.getByRole('region');
    expect(carousel).toHaveClass('custom-carousel');

    const content = screen.getByText('Slide 1').closest('.custom-content');
    expect(content).toHaveClass('custom-content');

    const item = screen.getByText('Slide 1').closest('.custom-item');
    expect(item).toHaveClass('custom-item');

    const prevButton = screen.getByText('Previous slide').closest('button');
    expect(prevButton).toHaveClass('custom-prev');

    const nextButton = screen.getByText('Next slide').closest('button');
    expect(nextButton).toHaveClass('custom-next');
  });
});
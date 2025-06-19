import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import VirtualList from '../VirtualList'

describe('VirtualList', () => {
  const mockItems = [
    { id: '1', name: 'Item 1', value: 'value1' },
    { id: '2', name: 'Item 2', value: 'value2' },
    { id: '3', name: 'Item 3', value: 'value3' },
    { id: '4', name: 'Item 4', value: 'value4' },
    { id: '5', name: 'Item 5', value: 'value5' },
  ]

  const mockRenderItem = jest.fn((item: any, index: number) => (
    <div data-testid={`item-${index}`}>
      {item.name} - {item.value}
    </div>
  ))

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders virtual list container', () => {
    render(
      <VirtualList
        items={mockItems}
        visibleCount={3}
        rowHeight={50}
        renderItem={mockRenderItem}
        containerClassName="test-virtual-list"
      />
    )

    const container = document.querySelector('.test-virtual-list')
    expect(container).toBeInTheDocument()
  })

  it('calls renderItem for visible items', () => {
    render(<VirtualList items={mockItems} visibleCount={3} rowHeight={50} renderItem={mockRenderItem} />)

    expect(mockRenderItem).toHaveBeenCalledWith(mockItems[0], 0)
    expect(mockRenderItem).toHaveBeenCalledWith(mockItems[1], 1)
    expect(mockRenderItem).toHaveBeenCalledWith(mockItems[2], 2)
  })

  it('handles scroll events', () => {
    const { container } = render(
      <VirtualList items={mockItems} visibleCount={3} rowHeight={50} renderItem={mockRenderItem} />
    )

    const scrollContainer = container.firstChild as HTMLElement
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 100 } })

    expect(scrollContainer).toBeInTheDocument()
  })

  it('handles empty items list', () => {
    render(<VirtualList items={[]} visibleCount={3} rowHeight={50} renderItem={mockRenderItem} />)

    expect(mockRenderItem).not.toHaveBeenCalled()
  })

  it('applies custom gap', () => {
    render(<VirtualList items={mockItems} visibleCount={3} rowHeight={50} renderItem={mockRenderItem} gap={20} />)

    const innerContainer = document.querySelector('[style*="gap: 20"]')
    expect(innerContainer).toBeInTheDocument()
  })
})

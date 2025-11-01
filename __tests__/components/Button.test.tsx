import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '@/components/Button'

const primaryColorClass = 'bg-[var(--color-primary)]'
const areaColorClass = 'bg-[var(--color-area)]'

describe('<Button>', () => {
  test('기본 버튼이 정상적으로 렌더링된다', () => {
    const testContent = '버튼 내용'
    render(<Button>{testContent}</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(testContent)
  })

  test('children props이 정상적으로 표시된다', () => {
    const testContent = '버튼 내용'
    render(<Button>{testContent}</Button>)

    expect(screen.getByText(testContent)).toBeInTheDocument()
  })

  test('color prop이 없을 때 기본 스타일이 적용된다', () => {
    render(<Button>Default 버튼</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass(areaColorClass)
    expect(button).not.toHaveClass(primaryColorClass)
  })

  test('loading 상태일 때 Loader 컴포넌트가 표시된다', () => {
    render(<Button loading>로딩 버튼</Button>)

    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  })

  test('loading 상태일 때 Loader에 올바른 props가 전달된다', () => {
    const color = 'red'
    render(
      <Button
        loading
        loadingColor={color}>
        로딩 버튼
      </Button>
    )

    const loader = screen.getByTestId('loader')
    expect(loader).toHaveStyle({
      borderColor: color
    })
  })

  test('loading 상태일 때 children이 숨겨진다', () => {
    const testContent = '버튼 내용'
    render(<Button loading>{testContent}</Button>)

    expect(screen.queryByText(testContent)).not.toBeInTheDocument()
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  test('loading이 false일 때 children이 표시되고 Loader는 숨겨진다', () => {
    const testContent = '버튼 내용'
    render(<Button loading={false}>{testContent}</Button>)

    expect(screen.getByText(testContent)).toBeInTheDocument()
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
  })

  test('onClick 이벤트 핸들러가 올바르게 동작한다', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>버튼 내용</Button>)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('color prop이 올바르게 적용된다', () => {
    render(<Button color="primary">버튼 내용</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass(primaryColorClass)
  })
})

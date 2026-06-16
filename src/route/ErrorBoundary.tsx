import { isRouteErrorResponse, useRouteError } from 'react-router'

function ErrorBoundary() {
  const error = useRouteError()

  let title = '出错啦！'
  let message = '发生了未知错误，请稍后重试。'
  let status = null

  if (isRouteErrorResponse(error)) {
    status = error.status
    title = `错误 ${error.status} - ${error.statusText}`
    message = error.data || '请求过程中发生错误。'
  } else if (error instanceof Error) {
    message = error.message
  }

  // 使用 tailwind.css 中的主题色
  // 这里采用主题中的 vibrant（主色）、ethereal（背景）、subtle（卡片背景）、elegant（文字）等
  return (
    <div
      className='flex min-h-screen flex-col items-center justify-center font-sans'
      style={{
        background:
          'linear-gradient(135deg, var(--color-ethereal-light, #F0F5FF) 0%, var(--color-ethereal, #E0E8F9) 100%)',
      }}
    >
      <div
        className='w-full max-w-md rounded-2xl px-8 py-12 text-center shadow-xl'
        style={{
          background: 'var(--color-subtle-light, #F0F0F0)',
        }}
      >
        <svg width='64' height='64' viewBox='0 0 64 64' fill='none' className='mx-auto mb-6'>
          <circle cx='32' cy='32' r='32' fill='var(--color-vibrant, #FF6347)' opacity='0.15' />
          <path
            d='M32 18v18'
            stroke='var(--color-vibrant, #FF6347)'
            strokeWidth='3'
            strokeLinecap='round'
          />
          <circle cx='32' cy='44' r='2.5' fill='var(--color-vibrant, #FF6347)' />
        </svg>
        <h1
          className='mb-3 text-3xl font-bold'
          style={{ color: 'var(--color-vibrant-dark, #CC3B33)' }}
        >
          {title}
        </h1>
        {status && (
          <div className='mb-2 text-lg' style={{ color: 'var(--color-elegant, #708090)' }}>
            状态码：{status}
          </div>
        )}
        <p className='mb-6' style={{ color: 'var(--color-elegant-dark, #5A6E79)' }}>
          {message}
        </p>
        {error instanceof Error && (
          <details
            className='mb-4 rounded-lg p-3 text-left text-sm break-all'
            style={{
              background: 'var(--color-ethereal-light, #F0F5FF)',
              color: 'var(--color-elegant, #708090)',
            }}
          >
            <summary className='cursor-pointer select-none'>查看错误详情</summary>
            <pre className='whitespace-pre-wrap'>{error.stack}</pre>
          </details>
        )}
        <button
          onClick={() => window.location.reload()}
          className='mt-2 rounded-lg px-8 py-2 text-base font-medium shadow transition-colors duration-200'
          style={{
            background:
              'linear-gradient(90deg, var(--color-vibrant, #FF6347) 0%, var(--color-vibrant-light, #FF8C7F) 100%)',
            color: 'var(--color-subtle-light, #F0F0F0)',
          }}
        >
          刷新页面
        </button>
      </div>
    </div>
  )
}

export default ErrorBoundary


import router from 'router/index'

export function go (url) {
  if (/^javas/.test(url) || !url) return
  const useRouter = typeof url === 'object' || (typeof url === 'string' && !/http/.test(url))
  if (useRouter) {
    router.go(url)
  } else {
    window.location.href = url
  }
}

export function getdate(_date, split){
	_date = new Date(_date);
	return [_date.getFullYear(), _date.getMonth() + 1, _date.getDate()].join(split);
}
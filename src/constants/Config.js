// export const axiosBaseUrl = "http://localhost:8080/api"
export const axiosBaseUrl = "https://mangafol-api.herokuapp.com/api"
// https://mangafol-api.herokuapp.com/swagger-ui/index.html

export const mapReadingStatus = (status) => {
  if (status === 1) {
    return {
      text: 'Đang đọc',
      variant: 'success'
    }
  } else if (status === 2) {
    return {
      text: 'Xong',
      variant: 'secondary'
    }
  } else {
    return {
      text: 'Ngưng',
      variant: 'danger'
    }
  }
}

export const mapTaleFinished = (finished) => {
  if (!finished) {
    return {
      text: 'Đang tiến hành',
      variant: 'primary'
    }
  } else {
    return {
      text: 'Đã xong',
      variant: 'success'
    }
  }
}

export const getTaleLink = (tale) => {
  return '/tales/' + tale.slug;
}
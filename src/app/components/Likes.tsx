"use client"

import React, { useState } from "react"
import { HiHeart } from "react-icons/hi"

export const Likes = () => {
  const [toggle, setToggle] = useState(false)
  const [likes, setLikes] = useState(0)
  const onClick = () => {
    setToggle((prevState) => !prevState)
    if (toggle) {
      setLikes((prevState) => prevState - 1)
    } else {
      setLikes((prevState) => prevState + 1)
    }
  }
  return (
    <div className="flex items-center space-x-2">
      <button onClick={onClick} type="button">
        <HiHeart
          className={`h-5 w-5 ${toggle ? "text-blue-500" : "text-gray-400"}`}
        />
      </button>
      <span>{likes}</span>
    </div>
  )
}

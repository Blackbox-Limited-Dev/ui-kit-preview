'use client'

import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import HeartIcon from '~icons/heart.svg'
import HeartSolidIcon from '~icons/heart-solid.svg'

import { AppIcon } from '../AppIcon'

import s from './AppLike.module.scss'

import type { AppLikeProps } from './AppLike.types'

const ICON_SIZE = 24
// Even count: every particle has an opposite. Paired with the shared radius /
// size below, the ring's centre of mass stays on the heart whatever the jitter.
const PARTICLE_COUNT = 8
const HALF_COUNT = PARTICLE_COUNT / 2

type Particle = {
  tx: number
  ty: number
  size: number
  rotation: number
  peakOpacity: number
  duration: number
  delay: number
}

const randomParticles = (): Particle[] => {
  const baseRadius = ICON_SIZE * 0.75
  // Opposite particles (i, i + HALF_COUNT) share radius and size, so the jitter
  // cancels across the ring instead of dragging its visual centre off the heart.
  const half = Array.from({ length: HALF_COUNT }, () => ({
    maxRadius: baseRadius * (0.92 + Math.random() * 0.16),
    size: 6 + Math.random() * 3,
  }))
  return [...half, ...half].map((pair, i) => {
    const angle = (i * Math.PI * 2) / PARTICLE_COUNT - Math.PI / 2
    const reach = pair.maxRadius * 1.1
    return {
      tx: Math.cos(angle) * reach,
      ty: Math.sin(angle) * reach,
      size: pair.size,
      rotation: Math.random() * 360,
      peakOpacity: 0.5 + Math.random() * 0.5,
      duration: 380 + Math.random() * 280,
      delay: Math.random() * 90,
    }
  })
}

export const AppLike = ({
  isLiked,
  onChange,
  disabled = false,
  label,
  className,
}: AppLikeProps) => {
  const [anim, setAnim] = useState<'like' | 'unlike' | null>(null)
  const [burst, setBurst] = useState<{
    id: number
    particles: Particle[]
  } | null>(null)
  const burstTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (burstTimeout.current) clearTimeout(burstTimeout.current)
    },
    []
  )

  const handleClick = () => {
    const next = !isLiked
    if (burstTimeout.current) clearTimeout(burstTimeout.current)
    if (next) {
      // Fresh particles per tap; the burst id in the keys forces a remount that
      // restarts the animation. A spent burst is unmounted once the last
      // particle fades so it does not linger for the heart's whole lifetime.
      const particles = randomParticles()
      setBurst((prev) => ({ id: (prev?.id ?? 0) + 1, particles }))
      const lastEnd = Math.max(...particles.map((p) => p.delay + p.duration))
      burstTimeout.current = setTimeout(() => setBurst(null), lastEnd)
    } else {
      setBurst(null)
    }
    setAnim(next ? 'like' : 'unlike')
    onChange(next)
  }

  return (
    <button
      type="button"
      className={cn(s.root, className)}
      aria-pressed={isLiked}
      aria-label={label}
      disabled={disabled}
      onClick={handleClick}
    >
      <span className={s.root_burst} aria-hidden>
        {burst?.particles.map((p, i) => (
          <span
            key={`${burst.id}-${i}`}
            className={s.root_particle}
            style={
              {
                animationDuration: `${p.duration}ms`,
                animationDelay: `${p.delay}ms`,
                '--tx': `${p.tx}px`,
                '--ty': `${p.ty}px`,
                '--rot': `${p.rotation}deg`,
                '--peak': p.peakOpacity,
              } as React.CSSProperties
            }
          >
            <AppIcon icon={HeartSolidIcon} size={p.size} />
          </span>
        ))}
      </span>
      <span
        className={cn(s.root_heart, {
          [s.root_heart_like]: anim === 'like',
          [s.root_heart_unlike]: anim === 'unlike',
        })}
        onAnimationEnd={() => setAnim(null)}
      >
        <AppIcon icon={isLiked ? HeartSolidIcon : HeartIcon} size={ICON_SIZE} />
      </span>
    </button>
  )
}

export type { AppLikeProps } from './AppLike.types'
